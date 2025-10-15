import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}&page=1`);
  };

  return (
    <header>
      <nav>
        <Link to="/">Hjem</Link>
        <Link to="/favorites">Favoritter</Link>
      </nav>
      <form onSubmit={submit} style={{ marginTop: 8 }}>
        <label
          htmlFor="search-input"
          style={{ position: "absolute", left: -9999 }}
        >
          Søk etter bøker
        </label>
        <input
          id="search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Søk bøker..."
        />
        <button type="submit">Søk</button>
      </form>
    </header>
  );
}
