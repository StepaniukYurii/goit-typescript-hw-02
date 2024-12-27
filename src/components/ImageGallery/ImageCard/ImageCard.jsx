import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => (
  <div onClick={onClick} className={styles.card}>
    <img
      className={styles.CardImage}
      src={image.urls.thumb}
      alt={image.alt_description || "Image"}
    />
  </div>
);

export default ImageCard;
