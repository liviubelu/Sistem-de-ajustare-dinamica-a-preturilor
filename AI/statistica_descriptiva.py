import pyodbc
import pandas as pd

# Conectare la baza de date SQL Server
conn = pyodbc.connect(
    r"Driver={SQL Server};"
    r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
    r"Database=Market_sql;"
    r"Trusted_Connection=yes;"
)


# Citim toate vânzările din tabela Sales
query = """
SELECT SaleDate, TypeID, SneakerID, SizeSold, Quantity
FROM Sales
"""

df = pd.read_sql(query, conn)

# Statistici descriptive
print("Statistici descriptive generale:\n", df.describe())

# Vânzări pe mărime
print("\nVânzări per mărime:")
print(df.groupby("SizeSold")["Quantity"].sum().sort_index())

# Vânzări pe model
print("\nVânzări per SneakerID:")
print(df.groupby("SneakerID")["Quantity"].sum().sort_values(ascending=False))

# Vânzări per variantă
print("\nVânzări per TypeID:")
print(df.groupby("TypeID")["Quantity"].sum().sort_values(ascending=False))

# Vânzări pe zile
print("\nVânzări zilnice:")
print(df.groupby("SaleDate")["Quantity"].sum().sort_index())
