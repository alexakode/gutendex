import styles from "./BookDetail.module.css";
export default function BookContent({ book }) {
  return (
    <div className={styles.bookContent}>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
    );
}