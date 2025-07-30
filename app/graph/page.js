"use client";

import React, { useEffect, useState } from "react";
import Nav from "../components/nav/nav";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const GraphPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [houseNo, setHouseNo] = useState(null); // 🌟 house_no state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/predictions-ten", {
          cache: "no-store", // ensures fresh data every time
        });
        const json = await res.json();
        console.log("📊 Graph JSON:", json);

        let predictions = [];

        if (Array.isArray(json)) {
          predictions = json;
        } else if (Array.isArray(json.predictions)) {
          predictions = json.predictions;
        }

        if (predictions.length > 0) {
          const sorted = [...predictions].sort((a, b) => a.year - b.year);
          const lastTen = sorted.slice(-10); // 🚀 Get only the latest 10 entries
          setData(lastTen);
          setHouseNo(lastTen[lastTen.length - 1].house_no || "N/A"); // 🏠 capture house_no
        } else {
          console.error("⚠️ Graph data is empty or invalid format:", json);
        }
      } catch (err) {
        console.error("❌ Error fetching graph data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black px-6 md:px-16 py-10 text-white font-mono flex flex-col items-center">
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-bold mt-9 text-blue-400">
            📈 House Price Graph
          </h1>
          {houseNo && (
            <p className="text-lg text-green-400 mt-2">
              🏠 House No: <span className="font-bold">{houseNo}</span>
            </p>
          )}
        </section>

        {loading ? (
          <p className="text-gray-500 text-lg animate-pulse">
            ⏳ Loading latest graph data...
          </p>
        ) : data.length === 0 ? (
          <p className="text-red-400 text-lg">⚠️ No data available to show.</p>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-6xl h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="year" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted_price"
                    stroke="#00FFAB"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* 🌐 Raw Data Display */}
            <div className="mt-12 w-full max-w-4xl">
              <h2 className="text-xl font-semibold text-purple-400 mb-4 text-center">
                🧾 Latest Prediction Data
              </h2>
              <div className="overflow-x-auto bg-[#111] rounded-lg shadow-md p-4 border border-gray-700">
                <table className="min-w-full table-auto text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-600">
                      <th className="px-4 py-2 text-gray-400">Year</th>
                      <th className="px-4 py-2 text-gray-400">Predicted Price</th>
                      <th className="px-4 py-2 text-gray-400">House No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700 hover:bg-[#1a1a1a]"
                      >
                        <td className="px-4 py-2 text-white">{item.year}</td>
                        <td className="px-4 py-2 text-green-300">
                          ₹{item.predicted_price?.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-2 text-blue-300">
                          {item.house_no || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default GraphPage;
