import { useBookmarks } from "../../context/BookmarkContext";

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-600">🔖 Bookmarked Items</h2>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">You have no bookmarks yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((item) => (
            <div key={`${item.type}-${item.id}`} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{item.data.title || item.data.text || item.data.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Type: {item.type}</p>

              {/* Type-based rendering */}
              {item.type === "qa" && <p>{item.data.text}</p>}
              {item.type === "resource" && (
                <a href={item.data.link || item.data.fileURL} target="_blank" className="text-blue-600 underline">
                  View Resource
                </a>
              )}
              {item.type === "lostfound" && (
                <div>
                  <p>Status: {item.data.status}</p>
                  <p>Contact: {item.data.contact}</p>
                </div>
              )}
              {item.type === "event" && (
                <div>
                  <p>{item.data.description}</p>
                  <p>Date: {item.data.date}</p>
                </div>
              )}

              <button
                onClick={() => removeBookmark(item.id, item.type)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
