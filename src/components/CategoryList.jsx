import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./CategoryList.module.css";

const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

export default function CategoryList() {
  return (
    <nav aria-label="Bokkategorier">
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Button
            key={cat}
            component={Link}
            to={`/category/${cat}`}
            variant="contained"
            color="primary"
            className={styles.categoryButton}
          >
            {cat}
          </Button>
        ))}
      </div>
    </nav>
  );
}
