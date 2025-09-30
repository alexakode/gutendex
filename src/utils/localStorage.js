export const getFavorites = () => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const addFavorite = (book) => {
    const current = getFavorites();
    const exists = current.some(b => b.id === book.id);
    if (!exists) {
        localStorage.setItem("favorites", JSON.stringify([...current, book]));
    }
};

export const removeFavorite = (id) => {
    const current = getFavorites().filter(book => book.id !== id);
    localStorage.setItem("favorites", JSON.stringify(current));
};