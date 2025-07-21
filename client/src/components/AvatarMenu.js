import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

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

const yearOptions = {
  BTech: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  MTech: ["1st Year", "2nd Year"],
};

export default function AvatarMenu() {
  const { user, logout, setUser } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempProfile, setTempProfile] = useState({});

  useEffect(() => {
    if (user) setTempProfile(user);
  }, [user]);

  if (!user) return null;

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfile((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSave = () => {
    setUser(tempProfile);
    setShowModal(false);
  };

  return (
    <div className="relative inline-block">
      {/* Avatar in navbar */}
      <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2 object-cover"
        />
        <span className="font-medium">{user.name}</span>
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute z-10 right-0 mt-2 bg-white shadow-md rounded w-48">
          <button
            onClick={() => {
              setShowModal(true);
              setShowDropdown(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            🚪 Logout
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            {/* Avatar Upload */}
            <label className="block text-sm font-medium mb-1">Choose Avatar Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-3 w-full border px-3 py-2 rounded" />
            {tempProfile.avatar && (
              <img src={tempProfile.avatar} alt="preview" className="w-20 h-20 object-cover rounded-full mb-3" />
            )}

            {/* Bio */}
            <label className="block text-sm font-medium mb-1">Your Bio</label>
            <textarea
              placeholder="Your bio..."
              value={tempProfile.bio || ""}
              onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            {/* Program */}
            <label className="block text-sm font-medium mb-1">Program</label>
            <select
              value={tempProfile.program || "BTech"}
              onChange={(e) =>
                setTempProfile((prev) => ({
                  ...prev,
                  program: e.target.value,
                  year: yearOptions[e.target.value]?.[0] || ""
                }))
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            >
              <option value="BTech">BTech</option>
              <option value="MTech">MTech</option>
            </select>

            {/* Year */}
            {tempProfile.program !== "PhD" && (
              <>
                <label className="block text-sm font-medium mb-1">Year</label>
                <select
                  value={tempProfile.year || ""}
                  onChange={(e) => setTempProfile({ ...tempProfile, year: e.target.value })}
                  className="w-full mb-3 px-3 py-2 border rounded"
                >
                  {(yearOptions[tempProfile.program] || []).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Branch */}
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              value={tempProfile.branch || ""}
              onChange={(e) => setTempProfile({ ...tempProfile, branch: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded"
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Save / Cancel */}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
