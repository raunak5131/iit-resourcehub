// src/pages/Auth/Register.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    clubId: "",
    bio: "",
    avatar: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      clubId: form.role === "club" ? form.clubId : null,
      bio: form.bio || "",
      avatar: form.avatar || `https://ui-avatars.com/api/?name=${form.name}`
    };

    localStorage.setItem("user", JSON.stringify(fullUser));
    alert("Registered successfully. Now login.");
    navigate("/"); // go back to login
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
          <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
          <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />

          <select name="role" value={form.role} onChange={handleChange}
            className="w-full px-4 py-2 border rounded">
            <option value="student">Student</option>
            <option value="club">Club Admin</option>
          </select>

          {form.role === "club" && (
            <input type="text" name="clubId" placeholder="Club ID" required value={form.clubId} onChange={handleChange}
              className="w-full px-4 py-2 border rounded" />
          )}

          <input type="text" name="bio" placeholder="Bio (optional)" value={form.bio} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />

          <input type="text" name="avatar" placeholder="Avatar URL (optional)" value={form.avatar} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
