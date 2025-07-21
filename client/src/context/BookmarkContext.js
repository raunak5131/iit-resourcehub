import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (item) => {
    if (!bookmarks.find((b) => b.id === item.id && b.type === item.type)) {
      setBookmarks([...bookmarks, item]);
    }
  };

  const removeBookmark = (itemId, type) => {
    setBookmarks(bookmarks.filter((b) => !(b.id === itemId && b.type === type)));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
