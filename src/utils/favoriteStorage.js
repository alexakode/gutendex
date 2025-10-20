export const getFavorites = () => {
  console.log("getFavorites called from favoriteStorage");
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const addFavorite = (book) => {
  console.log("addFavorite called from favoriteStorage");
  const current = getFavorites();
  const exists = current.some((b) => b.id === book.id);
  if (!exists) {
    localStorage.setItem("favorites", JSON.stringify([...current, book]));
  }
  return exists;
};

export const removeFavorite = (id) => {
  console.log("removeFavorite called from favoriteStorage");
  const current = getFavorites().filter((book) => book.id !== id);
  const updated = current.filter((book) => book.id === id).length === 0;
  localStorage.setItem("favorites", JSON.stringify(current));
  return updated;
};
