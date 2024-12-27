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

type Image = {
  id: string;
  alt_description: string | null;
  urls: {
    full: string;
    thumb: string;
  };
};

type AppState = {
  images: Image[];
  query: string;
  page: number;
  isLoading: boolean;
  error: string | null;
  modalImage: { src: string; alt: string } | null;
};

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    images: [],
    query: "",
    page: 1,
    isLoading: false,
    error: null,
    modalImage: null,
  });

  const fetchImages = useCallback(async (): Promise<void> => {
    if (!appState.query) return;

    try {
      setAppState((prevState) => ({
        ...prevState,
        isLoading: true,
        error: null,
      }));
      const response = await axios.get(BASE_URL, {
        params: {
          query: appState.query,
          page: appState.page,
          client_id: API_KEY,
        },
      });

      setAppState((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...response.data.results],
      }));
    } catch (error: any) {
      setAppState((prevState) => ({
        ...prevState,
        error: error.message || "Failed to load images. Please try again.",
      }));
    } finally {
      setAppState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, [appState.query, appState.page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = (searchQuery: string) => {
    setAppState({
      ...appState,
      query: searchQuery,
      images: [],
      page: 1,
    });
  };

  const handleLoadMore = () => {
    setAppState((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const openModal = (image: Image) => {
    setAppState({
      ...appState,
      modalImage: {
        src: image.urls.full,
        alt: image.alt_description || "Image",
      },
    });
  };

  const closeModal = () => {
    setAppState({
      ...appState,
      modalImage: null,
    });
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {appState.error && <ErrorMessage message={appState.error} />}
      <ImageGallery images={appState.images} onImageClick={openModal} />
      {appState.isLoading && <Loader />}
      {appState.images.length > 0 && !appState.isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {appState.modalImage && (
        <ImageModal
          isOpen={!!appState.modalImage}
          onClose={closeModal}
          image={appState.modalImage}
        />
      )}
    </div>
  );
}
