import styles from "./BookDetail.module.css";
export default function BookContent({ book }) {
  return (
    <div className={styles.bookContent}>
      <h2>{book.title}</h2>
      <p>{book.author || "Ukjent forfatter"}</p>
      <p>{book.description || "Ingen beskrivelse tilgjengelig."}</p>
    </div>
  );
}
