# app.py
from fastapi import FastAPI
from fastapi import Body
from pydantic import BaseModel
import pyodbc
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from prophet import Prophet


app = FastAPI()

# Permite accesul CORS din frontend (ex: localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_sales_data():
    conn = pyodbc.connect(
        r"Driver={SQL Server};"
        r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
        r"Database=Market_sql;"
        r"Trusted_Connection=yes;"
    )
    query = """
    SELECT SaleDate, TypeID, SneakerID, SizeSold, Quantity
    FROM Sales
    """
    df = pd.read_sql(query, conn)
    return df

@app.get("/api/sales-summary")
def sales_summary():
    df = get_sales_data()

    # Calcule sumarizate (transformă rezultatele în dict-uri JSON serializabile)
    desc = df.describe().to_dict()

    sales_per_size = df.groupby("SizeSold")["Quantity"].sum().sort_index().to_dict()
    sales_per_sneaker = df.groupby("SneakerID")["Quantity"].sum().sort_values(ascending=False).to_dict()
    sales_per_type = df.groupby("TypeID")["Quantity"].sum().sort_values(ascending=False).to_dict()
    sales_per_day = df.groupby("SaleDate")["Quantity"].sum().sort_index().to_dict()

    return {
        "description": desc,
        "sales_per_size": sales_per_size,
        "sales_per_sneaker": sales_per_sneaker,
        "sales_per_type": sales_per_type,
        "sales_per_day": sales_per_day,
    }

@app.get("/api/sales-daily")
def sales_daily():
    df = get_sales_data()

    # Aici facem o conexiune și aducem prețurile din baza de date
    conn = pyodbc.connect(
        r"Driver={SQL Server};"
        r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
        r"Database=Market_sql;"
        r"Trusted_Connection=yes;"
    )
    prices_query = """
    SELECT TypeID, Price
    FROM Sneakers_Type
    """
    prices_df = pd.read_sql(prices_query, conn)

    # Facem merge între df cu vânzări și df cu prețuri pe TypeID
    merged = pd.merge(df, prices_df, how='left', left_on='TypeID', right_on='TypeID')

    # Calculăm valoarea vânzărilor pe fiecare rând
    merged['Value'] = merged['Price'] * merged['Quantity']

    # Grupăm după dată și calculăm suma cantităților și a valorilor
    grouped = merged.groupby('SaleDate').agg({
        'Quantity': 'sum',
        'Value': 'sum'
    }).reset_index()

    # Transformăm în listă de dicturi pentru JSON
    result = grouped.to_dict(orient='records')

    # Formatăm datele în string ISO (pentru siguranță la frontend)
    for r in result:
        r['SaleDate'] = r['SaleDate'].strftime('%Y-%m-%d')

    return result

@app.get("/api/discounts")
def price_recommendations():
    import numpy as np
    from datetime import datetime, timedelta
    import pandas as pd
    import pyodbc

    conn = pyodbc.connect(
        r"Driver={SQL Server};"
        r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
        r"Database=Market_sql;"
        r"Trusted_Connection=yes;"
    )

    # 1. Citim vânzările din ultimele 90 de zile
    cutoff_date = (datetime.today() - timedelta(days=90)).strftime('%Y-%m-%d')
    sales_query = f"""
        SELECT TypeID, SizeSold, SUM(Quantity) AS TotalVanzari
        FROM Sales
        WHERE SaleDate >= '{cutoff_date}'
        GROUP BY TypeID, SizeSold
    """
    sales_df = pd.read_sql(sales_query, conn)

    # 2. Citim stocul actual
    stock_query = "SELECT TypeID, SizeValue, Stock FROM Size"
    stock_df = pd.read_sql(stock_query, conn)

    # 3. Combinăm vânzările cu stocul
    merged_df = pd.merge(stock_df, sales_df, left_on=["TypeID", "SizeValue"], right_on=["TypeID", "SizeSold"], how="left")
    merged_df["TotalVanzari"] = merged_df["TotalVanzari"].fillna(0)

    # 4. Calcule pentru epuizare
    merged_df["MediaZilnica"] = merged_df["TotalVanzari"] / 90
    merged_df["ZileEstimEpuizare"] = np.where(
        merged_df["MediaZilnica"] > 0,
        merged_df["Stock"] / merged_df["MediaZilnica"],
        float("inf")
    )

    # 5. Eliminăm inf
    filtrat_df = merged_df.replace([np.inf, -np.inf], np.nan).dropna(subset=["ZileEstimEpuizare"])

    # 6. Media pe TypeID
    medii = filtrat_df.groupby("TypeID")["ZileEstimEpuizare"].mean().reset_index()
    medii = medii[medii["ZileEstimEpuizare"] > 400]

    # 7. Prețuri & imagini
    pret_query = """
        SELECT t.TypeID, t.Price AS OldPrice, t.Image1, s.ModelName, t.SneakerID
        FROM Sneakers_Type t
        JOIN Sneakers s ON t.SneakerID = s.SneakerID
    """
    pret_df = pd.read_sql(pret_query, conn)

    # 8. Combinăm cu media
    result = pd.merge(medii, pret_df, on="TypeID")

    # 9. Calcul reducere
    def calc_discount(row):
        if row["ZileEstimEpuizare"] > 800:
            return round(row["OldPrice"] * 0.80, 2)
        else:
            return round(row["OldPrice"] * 0.90, 2)

    result["NewPrice"] = result.apply(calc_discount, axis=1)

    # 10. Trimitem doar coloanele necesare
    return result[["TypeID", "ModelName", "Image1", "OldPrice", "NewPrice"]].to_dict(orient="records")

class PriceUpdate(BaseModel):
    TypeID: int
    NewPrice: float

@app.post("/api/update-price")
def update_price(data: PriceUpdate):
    conn = pyodbc.connect(
        r"Driver={SQL Server};"
        r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
        r"Database=Market_sql;"
        r"Trusted_Connection=yes;"
    )
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE Sneakers_Type
        SET Price = ?
        WHERE TypeID = ?
    """, (data.NewPrice, data.TypeID))
    conn.commit()
    cursor.close()
    conn.close()
    return {"status": "success", "TypeID": data.TypeID, "NewPrice": data.NewPrice}
    
@app.get("/api/reduceri")
def get_reduceri():
    conn = pyodbc.connect(
        r"Driver={SQL Server};"
        r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
        r"Database=Market_sql;"
        r"Trusted_Connection=yes;"
    )

    # 1. Vânzările detaliate
    query_sales = """
    SELECT SaleDate, TypeID, SizeSold, Quantity
    FROM Sales
    """
    sales_df = pd.read_sql(query_sales, conn)
    sales_df["SaleDate"] = pd.to_datetime(sales_df["SaleDate"])

    # 2. Stocul actual
    stock_df = pd.read_sql("SELECT TypeID, SizeValue, Stock FROM Size", conn)

    # 3. Informații despre modele + prețuri
    info_df = pd.read_sql("""
    SELECT t.TypeID, s.ModelName, t.Image1, t.Price AS OldPrice
    FROM Sneakers_Type t
    JOIN Sneakers s ON t.SneakerID = s.SneakerID
    """, conn)

    # 4. Inițializare rezultat
    reduceri = []

    # 5. Iterăm pentru fiecare TypeID + SizeValue
    for _, row in stock_df.iterrows():
        type_id = row["TypeID"]
        size = row["SizeValue"]
        stoc = row["Stock"]

        vanzari = sales_df[(sales_df["TypeID"] == type_id) & (sales_df["SizeSold"] == size)]
        if len(vanzari) < 15:
            continue

        df = vanzari.groupby("SaleDate")["Quantity"].sum().reset_index()
        df.columns = ["ds", "y"]

        try:
            model = Prophet()
            model.fit(df)
            future = model.make_future_dataframe(periods=90)
            forecast = model.predict(future)

            forecast_90 = forecast.tail(90)
            media_zilnica = forecast_90["yhat"].mean()

            if media_zilnica == 0:
                continue

            zile_epuizare = stoc / media_zilnica

            # Regulă de reducere
            if zile_epuizare > 800:
                reducere = 0.20
            elif zile_epuizare > 400:
                reducere = 0.10
            else:
                continue

            info = info_df[info_df["TypeID"] == type_id].iloc[0]
            new_price = round(info["OldPrice"] * (1 - reducere), 2)

            reduceri.append({
                "TypeID": int(type_id),
                "SizeValue": int(size),
                "ModelName": info["ModelName"],
                "Image1": info["Image1"],
                "OldPrice": float(info["OldPrice"]),
                "NewPrice": new_price,
                "ZileEpuizare": round(zile_epuizare)
            })

        except Exception as e:
            print(f"Eroare la TypeID {type_id}, Size {size}: {e}")
            continue

    return JSONResponse(content=reduceri)