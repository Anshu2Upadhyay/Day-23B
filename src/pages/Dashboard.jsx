import React, { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [post, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data.post); // Agar backend res.data return karta hai to isse res.data kar dena
    } catch (err) {
      console.log("unable to fetch posts", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">All Post</h1>

      <div className="grid gap-4">
        {post.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 rounded-xl border"
          >
            <h1 className="text-gray-600">{post.title}</h1>
            <p className="text-gray-600">{post.content}</p>
            <p className="text-sm mt-2">{post.user?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;