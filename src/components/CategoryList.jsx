import { Link } from "react-router-dom";

const categories = [ "Fiction", "Mystery", "Thriller", "Romance", "Fantasy", "Morality", "Society", "Power", "Justice", "Adventure", "Tragedy", "War", "Philosophy"];

export default function CategoryList() {
    return (
        <ul>
            {categories.map(cat => (
                <li key={cat}>
                    <Link to={`/category/${cat}`}></Link>
                </li>
            ))}
        </ul>
    );
}