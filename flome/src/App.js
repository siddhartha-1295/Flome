import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/bookings", form);
    setSuccess(true);
    setForm({ name: "", email: "", date: "", time: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-purple-700">Mindful Meet Therapy</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4">
        {["name", "email", "date", "time", "message"].map((f) => (
          <input
            key={f}
            type={f === "message" ? "textarea" : f === "date" || f === "time" ? f : "text"}
            name={f}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            value={form[f]}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        ))}
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg w-full">
          Book Session
        </button>
        {success && <p className="text-green-600 text-center mt-2">Booking confirmed!</p>}
      </form>
    </div>
  );
}