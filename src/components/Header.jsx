import { Link } from "react-router-dom";
export default function Header() {
    return (
        <header>
            <nav>
                <Link to="/">Hjem</Link>
                <Link to="/favorites">Favoritter</Link>
            </nav>
        </header>
    );
}