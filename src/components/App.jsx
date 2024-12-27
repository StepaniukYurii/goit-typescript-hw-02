import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

const API_KEY = "VyyLZ6pkhpU9lkfKivwu3oYEkRRdCx-_737kAcIT41s";
const BASE_URL = "https://api.unsplash.com/search/photos";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const fetchImages = useCallback(async () => {
    if (!query) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(BASE_URL, {
        params: { query, page, client_id: API_KEY },
      });
      console.log(response.data);

      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      setError(error.message || "Failed to load images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    console.log("Image clicked:", image);
    setModalImage({
      src: image.urls.full,
      alt: image.alt_description || "Image",
    });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={closeModal}
          image={modalImage}
        />
      )}
    </div>
  );
}
