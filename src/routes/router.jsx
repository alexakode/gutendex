import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import BookDetail from "../pages/BookDetail";
import Category from "../pages/Category";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "book/:id", element: <BookDetail /> },
      { path: "category/:name", element: <Category /> },
    ],
  },
]);
