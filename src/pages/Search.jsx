import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const pageParam = searchParams.get("page") || "1";
  const page = Number(pageParam) || 1;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!q) {
      setBooks([]);
      return;
    }

    setLoading(true);
    setError(null);

    const url = `https://gutendex.com/books?search=${encodeURIComponent(
      q
    )}&page=${page}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Kunne ikke hente søk");
        return res.json();
      })
      .then((data) => {
        setBooks(data.results || []);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [q, page]);

  const goToUrl = (url) => {
    if (!url) return;
    // Gutendex `next` and `previous` are full URLs with a `page=` param. Extract page.
    try {
      const u = new URL(url);
      const p = u.searchParams.get("page") || "1";
      navigate(`/search?q=${encodeURIComponent(q)}&page=${p}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <h2>Søkeresultater for: {q}</h2>
      {loading && <p>Laster…</p>}
      {error && <p>Feil: {error}</p>}
      {!loading && !error && books.length === 0 && <p>Ingen resultater.</p>}
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            <Link to={`/book/${b.id}`}>{b.title}</Link>
            {b.authors && b.authors.length > 0 && (
              <span> — av {b.authors.map((a) => a.name).join(", ")}</span>
            )}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => goToUrl(prevUrl)} disabled={!prevUrl}>
          Forrige
        </button>
        <span style={{ margin: "0 8px" }}>Side {page}</span>
        <button onClick={() => goToUrl(nextUrl)} disabled={!nextUrl}>
          Neste
        </button>
      </div>
    </section>
  );
}
