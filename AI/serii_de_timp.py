import pyodbc
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.holtwinters import ExponentialSmoothing

# Conectare la SQL Server
conn = pyodbc.connect(
    r"Driver={SQL Server};"
    r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
    r"Database=Market_sql;"
    r"Trusted_Connection=yes;"
)

# Citim vânzările din SQL
query = """
SELECT SaleDate, Quantity
FROM Sales
"""
df = pd.read_sql(query, conn)

# Convertim la datetime și agregăm pe săptămâni
df['SaleDate'] = pd.to_datetime(df['SaleDate'])
df['Week'] = df['SaleDate'].dt.to_period('W').apply(lambda r: r.start_time)

# Agregăm totalul pe săptămâni
weekly_sales = df.groupby('Week')['Quantity'].sum().asfreq('W', fill_value=0)

# Verificăm că avem date suficiente
print(weekly_sales.tail())

# Aplicăm modelul Holt-Winters (trend + sezonalitate)
model = ExponentialSmoothing(weekly_sales, trend='add', seasonal='add', seasonal_periods=4)
fit = model.fit()

# Prezicem următoarele 6 săptămâni
forecast = fit.forecast(6)

# Afișăm graficul
plt.figure(figsize=(12, 5))
plt.plot(weekly_sales, label='Vânzări reale săptămânale')
plt.plot(forecast, label='Predicție (6 săptămâni)', linestyle='--', color='orange')
plt.title("Predicție vânzări săptămânale (Holt-Winters)")
plt.xlabel("Săptămână")
plt.ylabel("Perechi vândute")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
