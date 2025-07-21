import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.log("Delete error:", err);
      }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">👥 Users</h2>
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-md p-4 rounded mb-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4 border"
              />
              <div>
                <p className="font-semibold text-lg">👤 {user.name}</p>
                <p className="text-sm text-gray-600">📧 {user.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
              className="text-red-600 hover:underline text-sm"
            >
              ❌ Delete
            </button>
          </div>
          <p className="text-sm">📝 {user.bio}</p>
          <p className="text-sm mt-1">🏫 {user.department} | {user.program} | {user.year} Year</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
