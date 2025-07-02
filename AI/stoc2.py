import pyodbc
import pandas as pd
from prophet import Prophet
from datetime import datetime, timedelta

# Conectare la SQL Server
conn = pyodbc.connect(
    r"Driver={SQL Server};"
    r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
    r"Database=Market_sql;"
    r"Trusted_Connection=yes;"
)

# 1. Preluăm stocul pentru fiecare TypeID + SizeValue
stock_query = """
SELECT TypeID, SizeValue, Stock
FROM Size
"""
stock_df = pd.read_sql(stock_query, conn)

# 2. Preluăm vânzările zilnice per TypeID + SizeValue
sales_query = """
SELECT SaleDate, TypeID, SizeSold, SUM(Quantity) AS Quantity
FROM Sales
GROUP BY SaleDate, TypeID, SizeSold
"""
sales_df = pd.read_sql(sales_query, conn)
sales_df["SaleDate"] = pd.to_datetime(sales_df["SaleDate"])

# 3. Filtrăm ultimele 180 de zile
cutoff_date = datetime.today() - timedelta(days=180)
sales_df = sales_df[sales_df["SaleDate"] >= cutoff_date]

# 4. Rulăm Prophet pentru fiecare combinație TypeID + Size
results = []

for (type_id, size), group in sales_df.groupby(["TypeID", "SizeSold"]):
    if len(group) < 10:
        continue

    df_prophet = group.rename(columns={"SaleDate": "ds", "Quantity": "y"})[["ds", "y"]]

    try:
        model = Prophet(daily_seasonality=True)
        model.fit(df_prophet)

        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)

        forecast["cumulative_yhat"] = forecast["yhat"].clip(lower=0).cumsum()

        # Căutăm stocul curent
        stock_row = stock_df[(stock_df["TypeID"] == type_id) & (stock_df["SizeValue"] == size)]
        if stock_row.empty:
            continue
        current_stock = int(stock_row["Stock"].iloc[0])

        today = datetime.today().date()

        if current_stock == 0:
            results.append({
                "TypeID": type_id,
                "Size": size,
                "StocActual": current_stock,
                "Status": "Stoc epuizat"
            })
        else:
            depletion = forecast[forecast["cumulative_yhat"] >= current_stock]
            if not depletion.empty:
                depletion_date = depletion.iloc[0]["ds"].date()
                if today + timedelta(days=7) < depletion_date <= today + timedelta(days=30):
                    results.append({
                        "TypeID": type_id,
                        "Size": size,
                        "StocActual": current_stock,
                        "Status": f"Se epuizează pe {depletion_date}"
                    })

    except Exception as e:
        print(f"TypeID {type_id}, Size {size}: eroare Prophet -> {e}")
        continue

# 5. Afișăm combinațiile critice
df_results = pd.DataFrame(results)
print("\n⚠️ Mărimi care sunt epuizate sau se vor epuiza în ≤ 30 zile:")
print(df_results.sort_values(by=["Status", "TypeID", "Size"]))
