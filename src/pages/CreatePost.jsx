import React, { useState } from "react";
import api from "../api/api";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
  };

  const createpost = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/post", form);
      alert(res.data.message);
      setForm({ content: "", title: "" });
    } catch (err) {
      alert(err.response?.data?.message || "create post Faild");
      console.log("unable to create post", err);
    }
  };

  return (
    <div className="p-6">
      <form
        className="bg-white p-5 rounded-xl shadow max-w-lg"
        onSubmit={createpost}
      >
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>

        <input
          type="text"
          name="title"
          placeholder="enter post title"
          onChange={handleChange}
          value={form.title}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="content"
          placeholder="enter your content"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          value={form.content}
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white w-full p-2 rounded-full"
        >
          create
        </button>
      </form>
    </div>
  );
}

export default CreatePost;