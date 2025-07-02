import pyodbc
import pandas as pd
from datetime import datetime, timedelta
import numpy as np

# Conectare la baza de date SQL Server
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

# 2. Citim stocul
stock_query = "SELECT TypeID, SizeValue, Stock FROM Size"
stock_df = pd.read_sql(stock_query, conn)

# 3. Combinăm vânzările cu stocul
merged_df = pd.merge(stock_df, sales_df, left_on=["TypeID", "SizeValue"], right_on=["TypeID", "SizeSold"], how="left")
merged_df["TotalVanzari"] = merged_df["TotalVanzari"].fillna(0)
merged_df["MediaZilnica"] = merged_df["TotalVanzari"] / 90
merged_df["ZileEstimEpuizare"] = np.where(
    merged_df["MediaZilnica"] > 0,
    merged_df["Stock"] / merged_df["MediaZilnica"],
    np.inf
)

# 4. Excludem valorile infinite
filtrat_df = merged_df.replace([np.inf, -np.inf], np.nan).dropna(subset=["ZileEstimEpuizare"])

# 5. Grupăm pe TypeID și calculăm media estimării
grupare_typeid = filtrat_df.groupby("TypeID")["ZileEstimEpuizare"].mean().reset_index()

# 6. Citim prețurile actuale
pret_query = "SELECT TypeID, Price FROM Sneakers_Type"
pret_df = pd.read_sql(pret_query, conn)

# 7. Alăturăm prețurile la media de epuizare
final_df = pd.merge(grupare_typeid, pret_df, on="TypeID")

# 8. Aplicăm regulile de reducere
def calculeaza_reducere(row):
    if row["ZileEstimEpuizare"] > 1000:
        return 25
    elif row["ZileEstimEpuizare"] > 800:
        return 20
    elif row["ZileEstimEpuizare"] > 650:
        return 15
    elif row["ZileEstimEpuizare"] > 500:
        return 10
    else:
        return 0

final_df["Reducere(%)"] = final_df.apply(calculeaza_reducere, axis=1)
final_df["PretRedus"] = final_df["Price"] * (1 - final_df["Reducere(%)"] / 100)

# 9. Afișare rezultate în terminal
print("\n💰 Recomandări prețuri cu reducere pe baza estimării de epuizare:")
print(final_df[["TypeID", "ZileEstimEpuizare", "Price", "Reducere(%)", "PretRedus"]].sort_values(by="ZileEstimEpuizare", ascending=False))
