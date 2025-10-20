import { useEffect, useState } from "react";
import BookDetail from "./BookDetail";
import { getFavorites, removeFavorite } from "../utils/favoriteStorage";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  if (!favorites || favorites.length === 0) {
    return (
      <section>
        <h2>Dine favoritter</h2>
        <p>Ingen favoritter funnet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Dine favoritter</h2>
      <ul>
        {favorites.map((b) => (
          <li
            key={b.id}
            onClick={() => setSelectedBook(b)}
            style={{ cursor: "pointer" }}
          >
            <h3>
              <Link to={`/book/${b.id}`}>{b.title}</Link>
            </h3>
            {b.authors && b.authors.length > 0 && (
              <span> — av {b.authors.map((a) => a.name).join(", ")}</span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(b.id);
              }}
              style={{ marginLeft: 8 }}
            >
              Fjern
            </button>
          </li>
        ))}
      </ul>
      <BookDetail
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        bookId={selectedBook ? selectedBook.id : null}
      />
    </section>
  );
}
