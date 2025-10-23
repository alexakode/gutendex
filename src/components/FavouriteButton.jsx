import Button from "@mui/material/Button";
import { isFavorite, toggleFavorite } from "../utils/favoriteStorage";
import { useState, useEffect } from "react";
export default function FavouriteButton({ book, onToggle }) {
  const [isFav, setIsFav] = useState(false);
  if (!book) return null;
  useEffect(() => {
    if (book?.id) {
      setIsFav(isFavorite(book.id));
    }
  }, [book]);

  const handleToggle = () => {
    if (!book?.id) return;
    const updatedFavorites = toggleFavorite(book);
    setIsFav(isFavorite(book.id));
    if (onToggle) onToggle(updatedFavorites);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleToggle}>
      {isFav ? "Fjern fra favoritter" : "Legg til i favoritter"}
    </Button>
  );
}
