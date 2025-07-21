import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import clubs from "../../data/clubsData";

const ClubDetails = () => {
  const { id } = useParams();
  const club = clubs.find((club) => club.id === id);
  const auth = useAuth();

  const isAdmin = auth?.role === "club" && auth?.clubId === id;

  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState(club?.events || []);
  const [gallery, setGallery] = useState(club?.gallery || []);

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: ""
  });
  const [newImageFile, setNewImageFile] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  if (!club) return <div className="p-6">Club not found.</div>;

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date) return;
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ name: "", date: "", description: "" });
  };

  const handleImageUpload = () => {
    if (!newImageFile) return;
    const previewURL = URL.createObjectURL(newImageFile);
    setGallery([...gallery, previewURL]);
    setNewImageFile(null);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions([
      ...questions,
      { id: Date.now(), text: newQuestion, upvotes: 0 }
    ]);
    setNewQuestion("");
  };

  const upvote = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q
      )
    );
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <img src={club.logo} alt={club.name} className="h-24 mx-auto" />
        <h2 className="text-3xl font-bold mt-2">{club.name}</h2>
        <p className="text-gray-600 mt-1">{club.description}</p>
      </div>

      <div className="flex justify-between mt-6 items-center">
        <div className="flex space-x-4">
          {["events", "gallery", "qna"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        {isAdmin && (
          <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded font-medium">
            Admin Mode
          </span>
        )}
      </div>

      {/* EVENTS */}
      {activeTab === "events" && (
        <div className="mt-6 space-y-4">
          {isAdmin && (
            <div className="bg-yellow-50 p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-2">Add New Event</h3>
              <input
                type="text"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                className="border px-3 py-1 mr-2 mb-2"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="border px-3 py-1 mr-2 mb-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="border px-3 py-1 mr-2 mb-2"
              />
              <button
                onClick={handleAddEvent}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          )}

          {events.length === 0 ? (
            <p className="text-center text-gray-500">No events available.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow p-4 rounded border"
              >
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Date: {event.date}
                </p>
                <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  Register
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* GALLERY */}
      {activeTab === "gallery" && (
        <div className="mt-6">
          {isAdmin && (
            <div className="bg-yellow-50 p-4 rounded shadow mb-4">
              <h3 className="font-bold text-lg mb-2">Add Gallery Image</h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImageFile(e.target.files[0])}
                className="border px-3 py-1"
              />
              <button
                onClick={handleImageUpload}
                className="bg-green-600 text-white px-4 py-1 rounded ml-2"
              >
                Upload
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="club-img"
                className="w-full h-48 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>
      )}

      {/* QNA */}
      {activeTab === "qna" && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Ask Your Doubts</h3>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Type your question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="flex-1 border px-3 py-2 rounded mr-2"
            />
            <button
              onClick={handleAddQuestion}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ask
            </button>
          </div>
          {questions.length === 0 ? (
            <p className="text-gray-500">No questions yet.</p>
          ) : (
            questions
              .sort((a, b) => b.upvotes - a.upvotes)
              .map((q) => (
                <div
                  key={q.id}
                  className="bg-white shadow p-4 rounded border mb-2"
                >
                  <p className="text-gray-800 font-medium">{q.text}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => upvote(q.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      👍 {q.upvotes}
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default ClubDetails;
