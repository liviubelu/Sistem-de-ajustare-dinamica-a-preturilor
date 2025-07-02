'use client';

import { useEffect, useState } from 'react';
import VanzariPerMarime from '../components/VanzariPerMarime';
import VanzariPeZile from '../components/VanzariPeZile';
import ListaReduceri from '../components/ListaReduceri';
import Footer from '../components/footer';

export default function AdminSales() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'barchart' | 'daily' | 'discounts'>('discounts');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/sales-summary')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Se încarcă datele...</p>;

  const sizeLabels = Object.keys(data.sales_per_size);
  const sizeValues = Object.values(data.sales_per_size);

  const salesPerDay = data.sales_per_day;
  const startDate = new Date(Object.keys(salesPerDay)[0]);
  const endDate = new Date();
  const dateLabels: string[] = [];
  const dateValues: number[] = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    dateLabels.push(dateStr);
    dateValues.push(salesPerDay[dateStr] || 0);
  }

  return (
    <div className='bg-base-100 min-h-screen p-6 '>

      <div className="flex justify-center items-center w-full text-center my-6">
  <ul className="menu menu-vertical lg:menu-horizontal bg-primary rounded-box flex justify-center mb-8">
    <li><a onClick={() => setSelectedTab('discounts')}>Reduceri recomandate</a></li>
    <li><a onClick={() => setSelectedTab('daily')}>Vânzări pe zi</a></li>
    <li><a onClick={() => setSelectedTab('barchart')}>Vânzări per mărime</a></li>
  </ul>
</div>


      {/* Afișare în funcție de tab */}
      <div className="flex justify-center">
        {selectedTab === 'barchart' && (
          <div className="w-full max-w-5xl overflow-x-auto">
            <VanzariPerMarime labels={sizeLabels} data={sizeValues} title="Vânzări per mărime" />
          </div>
        )}

        {selectedTab === 'daily' && (
          <div className="w-full max-w-5xl overflow-x-auto">
            <VanzariPeZile labels={dateLabels} data={dateValues} title="Vânzări pe zi" />
          </div>
        )}

        {selectedTab === 'discounts' && (
          <div className="w-full max-w-7xl">
            <ListaReduceri />
          </div>
        )}
      </div>
      <Footer />
    </div>
    
  );
}
