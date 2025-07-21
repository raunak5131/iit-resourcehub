import React, { useState } from "react";

const LostFound = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    image: "",
    name: "",
    description: "",
    contact: "",
    status: "Lost",
  });
  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setNewItem({ ...newItem, image: fileReader.result });
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    setItems([{ ...newItem, timestamp }, ...items]);
    setNewItem({ image: "", name: "", description: "", contact: "", status: "Lost" });
  };

  const filteredItems =
    filterStatus === "All"
      ? items
      : items.filter((item) => item.status === filterStatus);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lost & Found</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          required
          className="block w-full"
        />
        <input
          type="text"
          name="name"
          placeholder="Object Name"
          value={newItem.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newItem.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="contact"
          placeholder="Contact Info"
          value={newItem.contact}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <select
          name="status"
          value={newItem.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </form>

      {/* Filter */}
      <div className="mt-6">
        <label className="mr-3 font-semibold">Filter:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredItems.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="mt-2 font-semibold">
                <span className="text-black">Status:</span>{" "}
                <span
                  className={
                    item.status === "Lost"
                      ? "text-red-600 font-bold"
                      : "text-green-600 font-bold"
                  }
                >
                  {item.status}
                </span>
              </p>
              <p className="mt-1">
                <span className="font-bold">Contact:</span> {item.contact}
              </p>
              <p className="text-sm text-gray-500 mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostFound;
