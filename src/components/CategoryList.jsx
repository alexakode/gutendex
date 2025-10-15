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
//   console.log(categories);
  return (
    <div className={styles.grid}>
      {categories.map((cat) => (<Button component={Link} to={`/category/${cat}`} variant="contained" color="primary" fullWidth sx={{textTransform: "none", fontWeight: 500}}>
            {cat}
          </Button>
      ))}
    </div>
  );
}
