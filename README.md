# Sistem de Ajustare Dinamică a Prețurilor – Proiect de Licență

Acest proiect reprezintă o platformă de e-commerce dedicată vânzării de sneakers, care integrează un mecanism inteligent de ajustare dinamică a prețurilor, bazat pe analiza vânzărilor și prognoze realizate cu algoritmul Prophet.

## 🔧 Tehnologii utilizate

- **Front-end**: Next.js (bazat pe React), Tailwind CSS, DaisyUI, Chart.js
- **Back-end**: FastAPI (Python), PyODBC
- **Bază de date**: Microsoft SQL Server
- **AI / Predictie**: Prophet (Facebook)
- **Altele**: JSON, JWT, NextAuth, Server-side rendering (SSR)

## 📁 Structura proiectului

```
next-app/
├── app/              # Front-end (Next.js)
├── AI/, lib/         # Scripturi Python pentru analiza AI și conexiuni
├── public/, pages/   # Conținut static și pagini front-end
├── app.py            # Server FastAPI
├── package.json      # Configurare Next.js
├── requirements.txt  # Biblioteci pentru FastAPI
├── .env              # Config variabile mediu (exclus din Git)
```

## ⚙️ Cum rulezi proiectul local

### 1. Baza de date – SQL Server

- Creează baza de date `Market_sql` în SQL Server
- Creează tabelele: `Brands`, `Sneakers`, `Sneakers_Type`, `Size`, `Sales`, `Users`
- Populează-le cu date de test sau folosește scripturile proprii
- Asigură-te că instanța SQL este accesibilă local

> Exemplu conexiune (folosită în `app.py`):
```python
conn = pyodbc.connect(
    r"Driver={SQL Server};"
    r"Server=DESKTOP-O2785UR\SQLEXPRESS;"
    r"Database=Market_sql;"
    r"Trusted_Connection=yes;"
)
```

### 2. Rulează backend-ul (FastAPI)

```bash
pip install -r requirements.txt
uvicorn app:app --reload
```

### 3. Rulează front-end-ul (Next.js)

```bash
npm install
npm run dev
```

## 📈 Funcționalități principale

- Pagini cu produse și mărimi disponibile
- Coș de cumpărături și plasare comandă
- Autentificare și gestionare conturi (NextAuth + JWT)
- Panou admin cu:
  - Vânzări pe mărime și pe zile (grafic Chart.js)
  - Recomandări de reduceri generate de Prophet
  - Actualizare automată a prețurilor prin back-end

## 🤖 Algoritmul de ajustare a prețului

- Prophet antrenează modele pe baza vânzărilor zilnice (`Sales`)
- Se estimează în câte zile se va epuiza stocul pentru fiecare mărime
- Dacă estimarea este prea mare (>400 sau >800 zile), se propune o reducere:
  - -10% sau -20%, în funcție de viteză vânzare
- Reducerile pot fi aplicate direct din interfață

## 📌 Direcții viitoare

- Integrare cu sisteme de plată online (Stripe, PayPal)
- Publicare aplicație pe server real sau platformă cloud (ex: Vercel, Azure)
- Extinderea mecanismului AI pentru recomandări de produse
- Adăugarea unui modul de stocuri inteligente

## 👨‍🎓 Autor

**Belu Liviu**  
Universitatea Transilvania din Brașov – Facultatea de Inginerie Electrică și Știința Calculatoarelor  
Coordonator: Conf. dr. ing. Cațaron Angel Doru