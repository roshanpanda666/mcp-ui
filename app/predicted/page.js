"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav/nav";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/predictions");
        const json = await res.json();
        console.log("📦 RAW JSON from backend:", json);

        if (Array.isArray(json)) {
          setData(json);
        } else if (Array.isArray(json.predictions)) {
          setData(json.predictions);
        } else {
          console.error("❌ Unexpected response:", json);
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] px-6 md:px-16 py-10 text-white font-mono flex flex-col items-center">
        <section className=" mb-12">
          <h1 className="text-3xl font-bold mt-9 text-green-400">
            🧠 House Price Predictions
          </h1>
         
        </section>

        {data.length === 0 ? (
          <p className="text-gray-500 text-lg animate-pulse">⏳ Fetching predictions...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
            {data.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:border-green-400"
              >
                <h2 className="text-xl font-bold text-cyan-300 mb-1">
                  🏠 House #{item.house_no}
                </h2>
                <p className="text-gray-400">📅 Year: {item.year}</p>
                <p className="mt-3 text-green-400 text-xl font-semibold">
                  💸 ₹{item.predicted_price}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
