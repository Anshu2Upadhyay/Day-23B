import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newForm);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/Register", form);
      alert(res.data.message);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register Failed");
      console.log("Unable to Register", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl text-center font-bold mb-4">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="w-full p-2 border rounded mb-3"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="w-full p-2 border rounded mb-3"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full p-2 border rounded mb-4"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;