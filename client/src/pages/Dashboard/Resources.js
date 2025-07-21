import React, { useEffect, useState } from "react";
import axios from "axios";
import { useBookmarks } from "../../context/BookmarkContext"; // 👈 Import hook

const programs = ["BTech", "MTech", "PhD"];
const branches = [
  "Computer Science",
  "Artificial Intelligence",
  "Mechanical",
  "Electrical",
  "Chemical",
  "Biotechnology",
  "Maths and Computing",
  "Material Science"
];
const resourceTypes = ["Notes", "Question Papers", "Reference Books"];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [newRes, setNewRes] = useState({
    program: "BTech",
    year: "1st Year",
    branch: "Computer Science",
    type: "Notes",
    title: "",
    file: null,
    link: ""
  });

  const [filters, setFilters] = useState({
    program: "All",
    branch: "All",
    type: "All"
  });

  const { bookmarks, addBookmark, removeBookmark } = useBookmarks(); // 👈 use context

  const yearOptions = {
    BTech: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    MTech: ["1st Year", "2nd Year"],
    PhD: []
  };

  // 🧠 NEW: Fetch resources from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/resources")
      .then((res) => setResources(res.data))
      .catch((err) => console.error("Fetch failed", err));
  }, []);

  // 🧠 NEW: Upload resource to backend
  const handleAdd = async () => {
    if (!newRes.title || (!newRes.link && !newRes.file)) {
      alert("Title and at least one upload method (file or link) required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", newRes.title);
    formData.append("program", newRes.program);
    formData.append("year", newRes.year);
    formData.append("branch", newRes.branch);
    formData.append("type", newRes.type);
    formData.append("link", newRes.link);
    if (newRes.file) {
      formData.append("file", newRes.file);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/resources", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResources((prev) => [...prev, res.data]);
      setNewRes({
        program: "BTech",
        year: "1st Year",
        branch: "Computer Science",
        type: "Notes",
        title: "",
        file: null,
        link: ""
      });
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredResources = resources.filter((r) => {
    return (
      (filters.program === "All" || r.program === filters.program) &&
      (filters.branch === "All" || r.branch === filters.branch) &&
      (filters.type === "All" || r.type === filters.type)
    );
  });

  const isBookmarked = (res) =>
    bookmarks.some((b) => b.id === res._id && b.type === "resource");

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">📚 Academic Resources</h2>

      {/* Upload Section */}
      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Upload New Resource</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <select
            name="program"
            value={newRes.program}
            onChange={(e) => {
              setNewRes({
                ...newRes,
                program: e.target.value,
                year: yearOptions[e.target.value][0] || ""
              });
            }}
            className="border px-3 py-2 rounded"
          >
            {programs.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          {newRes.program !== "PhD" && (
            <select
              name="year"
              value={newRes.year}
              onChange={(e) => setNewRes({ ...newRes, year: e.target.value })}
              className="border px-3 py-2 rounded"
            >
              {yearOptions[newRes.program].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          )}

          <select
            name="branch"
            value={newRes.branch}
            onChange={(e) => setNewRes({ ...newRes, branch: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            {branches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            name="type"
            value={newRes.type}
            onChange={(e) => setNewRes({ ...newRes, type: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            {resourceTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Title"
            value={newRes.title}
            onChange={(e) => setNewRes({ ...newRes, title: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          <input
            type="file"
            accept=".pdf, .jpg, .png"
            onChange={(e) => setNewRes({ ...newRes, file: e.target.files[0] })}
            className="border px-3 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Google Drive or URL (optional)"
            value={newRes.link}
            onChange={(e) => setNewRes({ ...newRes, link: e.target.value })}
            className="border px-3 py-2 rounded"
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Upload Resource
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          name="program"
          onChange={handleFilter}
          className="border px-3 py-1 rounded"
        >
          <option>All</option>
          {programs.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select
          name="branch"
          onChange={handleFilter}
          className="border px-3 py-1 rounded"
        >
          <option>All</option>
          {branches.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <select
          name="type"
          onChange={handleFilter}
          className="border px-3 py-1 rounded"
        >
          <option>All</option>
          {resourceTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Resource Cards */}
      {filteredResources.length === 0 ? (
        <p className="text-gray-500">No resources found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => (
            <div key={res._id} className="border p-4 rounded shadow bg-white relative">
              <h3 className="text-lg font-semibold mb-1">{res.title}</h3>
              <p className="text-sm text-gray-600">
                {res.program} {res.year ? `• ${res.year}` : ""} • {res.branch} • {res.type}
              </p>

              {/* 🔖 Bookmark Button */}
              <button
                onClick={() =>
                  isBookmarked(res)
                    ? removeBookmark(res._id)
                    : addBookmark({ id: res._id, type: "resource", data: res })
                }
                className={`absolute top-2 right-2 text-lg ${
                  isBookmarked(res) ? "text-yellow-600" : "text-gray-400"
                } hover:text-yellow-500`}
                title="Bookmark"
              >
                🔖
              </button>

              {res.link && (
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 mt-2 block hover:underline"
                >
                  🔗 Open Drive/Link
                </a>
              )}

              {res.fileURL && (
  <div className="mt-2">
    {res.fileURL.endsWith(".pdf") ? (
      <iframe
        src={`http://localhost:5000${res.fileURL}`}
        className="w-full h-48"
        title="Preview"
      />
    ) : (
      <img
        src={`http://localhost:5000${res.fileURL}`}
        className="w-full h-48 object-contain"
        alt="Preview"
      />
    )}

    {/* ✅ Open full file link */}
    <a
      href={`http://localhost:5000${res.fileURL}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline mt-2 block"
    >
      🔗 Open File
    </a>
  </div>
)}


            </div>
          ))}
        </div>
      )}
    </div>
  );
}
