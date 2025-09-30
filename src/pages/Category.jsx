import { useParams } from "react-router-dom";
export default function Category() {
    const { name } = useParams();
    return (
        <section>
            <h2>Bøker i kategori: {name}</h2>
        </section>
    )
}