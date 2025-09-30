import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addFavorite } from "../utils/localStorage";
export default function Category() {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://gutendex.com/books?topic=${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Kunne ikke hente bøker");
        return res.json();
      })
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);
  return (
    <section>
      <h2>Bøker i kategori: {name}</h2>
      {loading && <p>Laster bøker…</p>}
      {error && <p>Feil: {error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> av{" "}
            {book.authors.map((a) => a.name).join(", ")}
            <button onClick={() => addFavorite(book)}>Legg til favoritt</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
