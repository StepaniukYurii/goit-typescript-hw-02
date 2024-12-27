import Modal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;
  console.log("Modal image:", image);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <img src={image.src} alt={image.alt} />
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
    </Modal>
  );
};

export default ImageModal;
