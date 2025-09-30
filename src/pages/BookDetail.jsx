import { useParams } from "react-router-dom";
export default function BookDetail() {
    const { id } = useParams();
    return <h2>Detaljer for bok med ID: {id}</h2>
}