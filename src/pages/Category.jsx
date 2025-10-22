import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../utils/localStorage";
import FavouriteButton from "../components/FavouriteButton";
import BookDialog from "../components/BookDialog";
import styles from "./Category.module.css";
export default function Category() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = searchParams.get("page") || "1";
  const page = Number(pageParam) || 1;

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const handleOpen = (book) => setSelectedBook(book);
  const handleClose = () => setSelectedBook(null);

  useEffect(() => {
    // Clear current results so loading state is visible immediately
    setBooks([]);
    setLoading(true);
    setError(null);
    setFavorites(getFavorites());

    const url = `https://gutendex.com/books?topic=${encodeURIComponent(
      name
    )}&page=${page}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Kunne ikke hente bøker");
        return res.json();
      })
      .then((data) => {
        setBooks(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name, page]);
  const toggleFavorite = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    const updated = favorites.some((b) => b.id === bookId)
      ? removeFavorite(bookId)
      : addFavorite(book);
    setFavorites(updated);
    console.log("Toggled favorite for book ID:", bookId);
  };

  const goToUrl = (url) => {
    if (!url) return;
    try {
      const u = new URL(url);
      const p = u.searchParams.get("page") || "1";
      navigate(`/category/${encodeURIComponent(name)}?page=${p}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <h2>Bøker i kategori: {name}</h2>
      {loading && <p>Laster bøker…</p>}
      {error && <p>Feil: {error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <button onClick={() => handleOpen(book)} style={{ marginLeft: 8 }}>
              {book.title}
            </button>
            <span>av {book.authors.map((a) => a.name).join(", ")}</span>
            <FavouriteButton
              book={book}
              isFavorite={favorites.includes(book.id)}
              onToggle={setFavorites}
            />
          </li>
        ))}
      </ul>

      {selectedBook && (
        <BookDialog
          open={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          book={selectedBook}
        />
      )}
      <div style={{ marginTop: 12 }}>
        <button onClick={() => goToUrl(prevUrl)} disabled={!prevUrl || loading}>
          Forrige
        </button>
        <span style={{ margin: "0 8px" }}>Side {page}</span>
        <button onClick={() => goToUrl(nextUrl)} disabled={!nextUrl || loading}>
          Neste
        </button>
      </div>
    </section>
  );
}
