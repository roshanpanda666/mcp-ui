"use client";
import React, { useState } from "react";
import Nav from "../components/nav/nav";

const AddHouseForm = () => {
  const [formData, setFormData] = useState({
    house: "",
    area: "",
    year1: "",
    price1: "",
    year2: "",
    price2: "",
    year3: "",
    price3: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTerminalOutput("🔁 Calculating...\n");

    // Simulated terminal steps 🧠
    let dots = 0;
    const fakeSteps = [
      "🧠 Running model inference...",
      "📦 Packaging payload...",
      "🚀 Uploading to FastAPI...",
      "🤖 running regression model...",
      "✅ final Data pushed! Check the prediction tab!",
    ];

    for (let i = 0; i < fakeSteps.length; i++) {
      await new Promise((res) => setTimeout(res, 800));
      setTerminalOutput((prev) => prev + fakeSteps[i] + "\n");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Data submitted successfully! Check the prediction tab 🔮");
        handleClear();
      } else {
        const errorData = await response.json();
        alert("❌ Failed to submit: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("🚨 Submission error:", error);
      alert("⚠️ Error while submitting data!");
    }

    setIsLoading(false);
  };

  const handleClear = () => {
    setFormData({
      house: "",
      area: "",
      year1: "",
      price1: "",
      year2: "",
      price2: "",
      year3: "",
      price3: "",
    });
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen mt-10 bg-[#0f0f0f] text-white p-8">
        <h1 className="text-3xl font-bold text-green-400 mb-6">
          ➕ Add New House Data
        </h1>

        {/* Terminal Progress UI */}
        {isLoading && (
          <pre className="bg-black text-green-400 font-mono text-sm p-4 mb-6 rounded-md border border-green-700 shadow-inner">
            {terminalOutput}
          </pre>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 space-y-6 shadow-md"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-1 text-sm text-gray-300">🏠 House ID</label>
              <input
                name="house"
                value={formData.house}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm text-gray-300">📍 Area</label>
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-300">📅 Year 1</label>
              <input
                name="year1"
                value={formData.year1}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
              <label className="block mt-2 text-sm text-gray-300">💸 Price 1</label>
              <input
                name="price1"
                value={formData.price1}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">📅 Year 2</label>
              <input
                name="year2"
                value={formData.year2}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
              <label className="block mt-2 text-sm text-gray-300">💸 Price 2</label>
              <input
                name="price2"
                value={formData.price2}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">📅 Year 3</label>
              <input
                name="year3"
                value={formData.year3}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
              <label className="block mt-2 text-sm text-gray-300">💸 Price 3</label>
              <input
                name="price3"
                value={formData.price3}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-white"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-6">
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200"
            >
              🧹 Clear
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200"
            >
              {isLoading ? "⏳ Submitting..." : "🚀 Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddHouseForm;
