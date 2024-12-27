import ImageCard from "./ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) return null;

  return (
    <ul className={styles.ImageGaleery}>
      {images.map((image, index) => (
        <li className={styles.ImageBlock} key={`${image.id}-${index}`}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
