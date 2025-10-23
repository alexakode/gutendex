import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./BookDetail.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import colorthief from "colorthief";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../utils/favoriteStorage";
import BookContent from "./BookContent";
import BookDetail from "./BookDetail";
import FavouriteButton from "./FavouriteButton";
export default function BookDialog({ open, onClose, book }) {
  if (!book) return null;
  const isFavorite = () => {
    const favs = getFavorites();
    return favs.some((b) => b.id === book.id);
  };

  const toggleFavorite = () => {
    if (isFavorite()) {
      removeFavorite(book.id);
    } else {
      addFavorite({ id: book.id });
    }
  };
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent>
        <pre>{JSON.stringify(book, null, 2)}</pre>

        <Typography>
          av{" "}
          {book.authors?.map((a) => a.name).join(", ") || "Ukjente forfattere"}{" "}
          {/* - Detaljer for bok med ID: {book.id}
          {book.summaries || "Ingen beskrivelser tilgjengelig."} */}
        </Typography>
      </DialogContent>
      <DialogActions>
        <button onClick={() => navigate(`/book/${book.id}`)} color="secondary">
          Åpne bokdetaljer
        </button>
        <Button onClick={toggleFavorite} color="primary">
          {isFavorite() ? "Fjern fra favoritter" : "Legg til i favoritter"}
        </Button>
        <Button onClick={onClose} color="primary">
          Lukk
        </Button>
      </DialogActions>
    </Dialog>
  );
}
