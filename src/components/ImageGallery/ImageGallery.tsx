import ImageCard from "./ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from "../types";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (images.length === 0) return null;

  return (
    <ul className={styles.ImageGallery}>
      {images.map((image) => (
        <li className={styles.ImageBlock} key={image.id}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
