"use client";
interface ITotalSelles {
  initial_amount_price: number;
}
import { getEarningsOfCurrentMonth } from '@/(db)/data';
import { useState } from 'react';
const Home = () => {
  const [initial_amount_price, setInitial_amount_price] = useState(0);
  const [loading, setLoading] = useState(false);
  const handelInitial_amount_price = async (e) => {
    setInitial_amount_price(e.target.value);
  }

  const handelAdd = async () => {
    try {
      setLoading(true);
      console.log(initial_amount_price);
      const res = await getEarningsOfCurrentMonth({initial_amount_price});
      if (res?.status === 'error') {
        return;
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center p-24">
      <input
        onChange={handelInitial_amount_price}
        className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
        type="number" />
    
      <button
        onClick={handelAdd}
        className='w-full h-12 bg-primary text-white rounded-lg mt-4'
      >
        {loading ? 'جاري التحميل...' : 'إضافة'}
      </button>
    </main>
  );
}

export default Home;
