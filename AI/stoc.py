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

# 1. Citim vânzările zilnice totale
query = """
SELECT SaleDate, SUM(Quantity) AS TotalSales
FROM Sales
GROUP BY SaleDate
"""
df = pd.read_sql(query, conn)
df["SaleDate"] = pd.to_datetime(df["SaleDate"])
df = df.sort_values("SaleDate")

# 2. Pregătim datele pentru Prophet
df_prophet = df.rename(columns={"SaleDate": "ds", "TotalSales": "y"})

# 3. Model și prognoză
model = Prophet()
model.fit(df_prophet)

# 4. Generăm 30 de zile în viitor
future = model.make_future_dataframe(periods=30)
forecast = model.predict(future)

# 5. Selectăm doar datele viitoare
today = datetime.today().date()
forecast_future = forecast[forecast["ds"].dt.date > today]

# 6. Afișăm doar data și previziunea (yhat)
print("\n📅 Previziune vânzări pentru următoarele 30 de zile:\n")
print(forecast_future[["ds", "yhat"]].rename(columns={"ds": "Data", "yhat": "VanzariEstimate"}).to_string(index=False))
