import styles from "./ImageCard.module.css";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => (
  <div onClick={onClick} className={styles.card}>
    <img
      className={styles.CardImage}
      src={image.urls.thumb}
      alt={image.alt_description || "Image"}
    />
  </div>
);

export default ImageCard;
