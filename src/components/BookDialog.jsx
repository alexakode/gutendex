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
import styles from "../pages/BookDetail.module.css";
import { useEffect, useState, useRef } from "react";
import colorthief from "colorthief";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../utils/favoriteStorage";
import BookContent from "./BookContent";
import BookDetail from "./BookDetail";
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
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent>
        <Typography>Detaljer for bok med ID: {book.id}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleFavorite} color="primary">
          {isFavorite() ? "Fjern fra favoritter" : "Legg til i favoritter"}
        </Button>
        <Button onClick={onClose} color="primary">
          Lukk
        </Button>
      </DialogActions>
      <BookContent book={book} />
    </Dialog>
  );
}
