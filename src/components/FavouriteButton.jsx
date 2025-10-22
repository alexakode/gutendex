export default function FavouriteButton({ bookId, isFavorite, onToggle }) {
  return (
    <button onClick={() => onToggle(bookId)}>
      {isFavorite ? "Fjern fra favoritter" : "Legg til i favoritter"}
    </button>
  );
}
