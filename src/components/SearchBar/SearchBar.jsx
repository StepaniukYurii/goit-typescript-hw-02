import { useState } from "react";
import styles from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
import { SlMagnifier } from "react-icons/sl";
const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter text to search images!");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <SlMagnifier />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images and photos"
          className={styles.input}
        />
      </form>
    </div>
  );
};

export default SearchBar;
