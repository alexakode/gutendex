import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addFavorite } from "../utils/localStorage";

export default function Category() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = searchParams.get("page") || "1";
  const page = Number(pageParam) || 1;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    // Clear current results so loading state is visible immediately
    setBooks([]);
    setLoading(true);
    setError(null);

    const url = `https://gutendex.com/books?topic=${encodeURIComponent(name)}&page=${page}`;
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
            <strong>
              <Link to={`/book/${book.id}`}>{book.title}</Link>
            </strong>{" "}
            av {book.authors.map((a) => a.name).join(", ")}
            <button onClick={() => addFavorite(book)} style={{ marginLeft: 8 }}>
              Legg til favoritt
            </button>
          </li>
        ))}
      </ul>

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
