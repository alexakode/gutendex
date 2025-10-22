export const getFavorites = () => {
  console.log("getFavorites called from favoriteStorage");
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const addFavorite = (book) => {
  console.log("addFavorite called from favoriteStorage");
  const current = getFavorites();
  const exists = current.some((b) => b.id === book.id);
  if (!exists) {
    const updated = [...current, book];
    localStorage.setItem("favorites", JSON.stringify(updated));
  }
  return exists;
};

export const removeFavorite = (bookId) => {
  console.log("removeFavorite called from favoriteStorage");
  const current = getFavorites();
  const updated = current.filter((b) => b.id !== bookId);
  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
};
export const isFavorite = (bookId) => {
  const favs = getFavorites();
  return favs.some((b) => b.id === bookId);
};
export const toggleFavorite = (book) => {
  const favs = getFavorites();
  const exists = favs.some((b) => b.id === book.id);
  const updated = exists
    ? favs.filter((b) => b.id !== book.id)
    : [...favs, book];
  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
};
