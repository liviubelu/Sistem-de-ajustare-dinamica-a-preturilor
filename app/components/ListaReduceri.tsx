'use client';

import React, { useEffect, useState } from 'react';

export default function ListaReduceri() {
  const [data, setData] = useState<any[]>([]); // ne asigurăm că e array

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/discounts')
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) {
          setData(json); // ✅ setează doar dacă e array
        } else if (Array.isArray(json.data)) {
          setData(json.data); // ✅ fallback pentru răspuns { data: [...] }
        } else {
          console.warn("Datele nu sunt un array:", json);
          setData([]); // fallback gol
        }
      });
  }, []);

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-sm opacity-60 px-4">Nu există reduceri recomandate momentan.</p>;
  }

  return (
  <div className="bg-base-300 rounded-box shadow-md p-4">
    <p className="text-center pb-4 text-2xl opacity-60 tracking-wide ">Reduceri recomandate pe baza vânzărilor lente</p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="border border-base-200 p-4 rounded-box flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <img className="size-16 rounded-box object-cover" src={item.Image1} alt={item.ModelName} />
            <div className="flex-1">
              <div className="font-bold">{item.ModelName}</div>
              <p className="text-xs">
                Preț actual: <span>{item.OldPrice} RON</span><br />
                Preț recomandat: <span className="font-bold text-success">{item.NewPrice?.toFixed(2)} RON</span>
              </p>
            </div>
          </div>
          <div className="flex gap-1 justify-end mt-auto">
            
            <button
  className="btn btn-sm btn-outline btn-primary tooltip"
  data-tip="Schimbă prețul"
  onClick={() => {
    fetch('http://127.0.0.1:8000/api/update-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TypeID: item.TypeID,
        NewPrice: item.NewPrice
      })
    })
      .then(res => res.json())
      .then(resp => {
        if (resp.status === "success") {
          alert(`Prețul a fost actualizat pentru TypeID ${item.TypeID}`);
          // Opțional: update local pentru UI
          const updated = data.map((el, i) =>
            i === index ? { ...el, OldPrice: item.NewPrice } : el
          );
          setData(updated);
        } else {
          alert("Eroare la actualizarea prețului.");
        }
      });
  }}
>
  <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 4v6.586a2 2 0 00.586 1.414l9 9a2 2 0 002.828 0l4.172-4.172a2 2 0 000-2.828l-9-9A2 2 0 0010.586 4H4zM6 7a1 1 0 112 0 1 1 0 01-2 0z" />
  </svg>
</button>

          </div>
        </div>
      ))}
    </div>
  </div>
);

}
