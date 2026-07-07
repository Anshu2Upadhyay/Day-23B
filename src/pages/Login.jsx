import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/Login", form);
      localStorage.setItem("token", res.data?.token);
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "login Faild");
      console.log("unable to login", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-xl shadow-lg"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Your email"
          className="w-full border p-2 mb-3 rounded"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Your password"
          className="w-full border p-2 mb-3 rounded"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-black text-white w-full p-2 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;