import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../utils/localStorage";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Kunne ikke hente bok");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const isFavorite = () => {
    const favs = getFavorites();
    return favs.some((b) => b.id === book?.id);
  };

  const toggleFavorite = () => {
    if (!book) return;
    if (isFavorite()) {
      removeFavorite(book.id);
      // force re-render by copying book
      setBook({ ...book });
    } else {
      addFavorite(book);
      setBook({ ...book });
    }
  };

  if (loading) return <p>Laster bok...</p>;
  if (error) return <p>Feil: {error}</p>;
  if (!book) return <p>Fant ingen bok.</p>;

  const cover = book.formats?.["image/jpeg"] || null;
  // Collect available format links
  const formatLinks = [
    { key: "text/html; charset=utf-8", label: "HTML" },
    { key: "application/epub+zip", label: "EPUB" },
    { key: "text/plain; charset=utf-8", label: "Ren tekst" },
    { key: "application/pdf", label: "PDF" },
  ].filter((f) => book.formats?.[f.key]);

  return (
    <section>
      <h2>{book.title}</h2>
      {cover && (
        <img
          src={cover}
          alt={`Cover for ${book.title}`}
          style={{ maxWidth: 200 }}
        />
      )}
      <p>
        Forfatter: {book.authors?.map((a) => a.name).join(", ") || "Ukjent"}
      </p>
      <p>Nedlastinger: {book.download_count}</p>
      <p>Kategorier: {book.subjects?.slice(0, 5).join(", ")}</p>
      <p>Språk: {book.languages?.join(", ")}</p>
      {formatLinks.length > 0 && (
        <div>
          <p>Tilgjengelige formater:</p>
          <ul>
            {formatLinks.map((f) => (
              <li key={f.key}>
                <a href={book.formats[f.key]}>{f.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={toggleFavorite}>
        {isFavorite() ? "Fjern fra favoritter" : "Legg til i favoritter"}
      </button>
    </section>
  );
}
