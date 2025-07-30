"use client";
import React, { useEffect, useState } from "react";
import Nav from "./components/nav/nav";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/");
        const json = await res.json();
        setData(json);
        console.log("📦 Data fetched:", json);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <div className="pt-[80px] min-h-screen bg-[#0f0f0f] text-white px-6 pb-10">
        <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">
          🏠 House Price Dataset
        </h1>

        {data.length === 0 ? (
          <p className="text-center text-gray-400">⏳ Loading data...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:border-green-400"
              >
                <h2 className="text-xl font-semibold text-green-300 mb-2">
                  🏡 House ID: {item.house}
                </h2>
                <p className="text-sm text-gray-400 mb-1">
                  📍 Area: {item.area}
                </p>

                <div className="mt-2">
                  <p>
                    📅 <strong>Yearly Prices</strong>
                  </p>
                  <ul className="ml-4 list-disc text-sm">
                    <li>
                      {item.year1}: ₹{item.price1}
                    </li>
                    <li>
                      {item.year2}: ₹{item.price2}
                    </li>
                    <li>
                      {item.year3}: ₹{item.price3}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
