import React, { useState } from "react";
import { useBookmarks } from "../../context/BookmarkContext"; // ✅ Use context

export default function Qa() {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks(); // ✅ Access context

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to prepare for midsems effectively?",
      description: "I feel overwhelmed with the syllabus. Any tips?",
      tags: ["study", "iit", "midsems"],
      answers: [
        { id: 1, text: "Make weekly targets and follow Pomodoro technique.", votes: 3 },
        { id: 2, text: "Revise class notes regularly and solve PYQs.", votes: 5 },
      ],
    },
  ]);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const [newAnswer, setNewAnswer] = useState("");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Filter states
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortByUpvotes, setSortByUpvotes] = useState(false);

  // Utility to check if a question is bookmarked
  const isBookmarked = (id) => {
    return bookmarks.some((b) => b.id === id && b.type === "qa");
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const newQ = {
      id: Date.now(),
      title: newQuestion.title,
      description: newQuestion.description,
      tags: newQuestion.tags.split(",").map((tag) => tag.trim()),
      answers: [],
    };
    setQuestions([newQ, ...questions]);
    setNewQuestion({ title: "", description: "", tags: "" });
  };

  const handleAnswerSubmit = (questionId) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const newAns = {
          id: Date.now(),
          text: newAnswer,
          votes: 0,
        };
        return { ...q, answers: [...q.answers, newAns] };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    setNewAnswer("");
  };

  const handleVote = (questionId, answerId, delta) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const updatedAnswers = q.answers.map((a) =>
          a.id === answerId ? { ...a, votes: a.votes + delta } : a
        );
        return { ...q, answers: updatedAnswers };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const filteredQuestions = questions
    .filter((q) =>
      showOnlyBookmarked ? isBookmarked(q.id) : true
    )
    .filter((q) =>
      searchTerm
        ? q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((q) => (selectedTag ? q.tags.includes(selectedTag) : true))
    .sort((a, b) =>
      sortByUpvotes
        ? b.answers.reduce((sum, a) => sum + a.votes, 0) -
          a.answers.reduce((sum, a) => sum + a.votes, 0)
        : 0
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧠 Q&A - Ask and Solve Doubts</h1>

      {/* Ask a question form */}
      <form onSubmit={handleQuestionSubmit} className="mb-6 bg-white p-4 shadow rounded space-y-3">
        <input
          type="text"
          placeholder="Question Title"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          placeholder="Describe your doubt..."
          value={newQuestion.description}
          onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newQuestion.tags}
          onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Question
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          className="border px-3 py-2 rounded w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Tag</option>
          {[...new Set(questions.flatMap((q) => q.tags))].map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
          className={`px-3 py-2 rounded ${
            showOnlyBookmarked ? "bg-yellow-300" : "bg-gray-200"
          } hover:bg-yellow-400 transition`}
        >
          {showOnlyBookmarked ? "Show All" : "Show Bookmarked"}
        </button>

        <button
          onClick={() => setSortByUpvotes(!sortByUpvotes)}
          className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded"
        >
          {sortByUpvotes ? "Unsort" : "Sort by Upvotes"}
        </button>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 && <p>No questions match the filter/search.</p>}
      {filteredQuestions.map((q) => (
        <div key={q.id} className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold">{q.title}</h3>
          <p className="text-gray-700">{q.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {q.tags.map((tag, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 text-sm rounded">{`#${tag}`}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4">
            {/* Bookmark Button */}
            <button
              onClick={() =>
                isBookmarked(q.id)
                  ? removeBookmark(q.id)
                  : addBookmark({ id: q.id, type: "qa", data: q })
              }
              className={`text-sm font-semibold ${
                isBookmarked(q.id) ? "text-yellow-600" : "text-gray-500"
              } hover:text-yellow-700`}
            >
              {isBookmarked(q.id) ? "🔖 Bookmarked" : "🔖 Bookmark"}
            </button>

            <button
              onClick={() =>
                setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)
              }
              className="text-sm text-blue-600 hover:underline"
            >
              {expandedQuestionId === q.id ? "Hide Answers" : "Show Answers"}
            </button>
          </div>

          {/* Answers */}
          {expandedQuestionId === q.id && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Answers:</h4>
              {q.answers.map((a) => (
                <div
                  key={a.id}
                  className="p-2 mb-2 border rounded flex justify-between items-center"
                >
                  <span>{a.text}</span>
                  <div className="flex gap-2 items-center text-sm">
                    <button
                      onClick={() => handleVote(q.id, a.id, 1)}
                      className="text-green-600 font-bold"
                    >
                      ▲
                    </button>
                    <span>{a.votes}</span>
                    <button
                      onClick={() => handleVote(q.id, a.id, -1)}
                      className="text-red-600 font-bold"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}

              {/* Answer Form */}
              <textarea
                placeholder="Type your answer..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full mt-2 border p-2 rounded"
              />
              <button
                onClick={() => handleAnswerSubmit(q.id)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Post Answer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
