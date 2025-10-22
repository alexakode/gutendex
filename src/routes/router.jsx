import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
// import BookDetail from "../pages/BookDetail";
import Category from "../pages/Category";
import Favorites from "../pages/Favorites";
import Search from "../pages/Search";
const basename = import.meta.env.DEV ? "/" : "/gutendex";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        // { path: "book/:id", element: <BookDetail /> },
        { path: "favorites", element: <Favorites /> },
        { path: "search", element: <Search /> },
        { path: "category/:name", element: <Category /> },
      ],
    },
  ],
  { basename }
);
