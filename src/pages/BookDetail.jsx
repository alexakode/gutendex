import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import colorthief from "colorthief";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../utils/localStorage";
import { Button, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./BookDetail.module.css";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const coverRef = useRef(null);
  const theme = useTheme();

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
    <section
      className={styles.container}
      style={{
        "--font-body": theme.typography.body1.fontSize,
        "--font-title": theme.typography.h2.fontSize,
      }}
    >
      <h2>{book.title}</h2>
      {cover && (
        <img
          ref={coverRef}
          src={cover}
          alt={`Cover for ${book.title}`}
          className={styles.coverImage}
          // crossOrigin="anonymous"
        />
      )}
      <dl className={styles.info}>
        <dt>Forfatter:</dt>
        <dd>{book.authors?.map((a) => a.name).join(", ") || "Ukjent"}</dd>
        <dt>Nedlastinger:</dt>
        <dd>{book.download_count}</dd>
        <dt>Kategorier:</dt>
        <dd className={styles.subjectTags}>
          {book.subjects?.slice(0, 5).map((subject) => {
            const parts = subject.split("--").map((s) => s.trim());
            return parts.length > 1 ? (
              <span key={subject} className={styles.tagGroup}>
                <span className={styles.tagLeft}>{parts[0]}</span>
                <span className={styles.tagRight}>{parts[1]}</span>
              </span>
            ) : (
              <span key={subject} className={styles.tag}>
                {subject}
              </span>
            );
          })}
        </dd>
        <dt>Språk:</dt>
        <dd>{book.languages?.join(", ") || "Ukjent"}</dd>
      </dl>
      {formatLinks.length > 0 && (
        <div>
          <p>Tilgjengelige formater:</p>
          <ul className={styles.formatList}>
            {formatLinks.map((f) => (
              <li key={f.key}>
                <Button
                  variant="outlined"
                  component="a"
                  href={book.formats[f.key]}
                >
                  {f.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button variant="contained" color="primary" onClick={toggleFavorite}>
        {isFavorite() ? "Fjern fra favoritter" : "Legg til i favoritter"}
      </Button>
    </section>
  );
}
