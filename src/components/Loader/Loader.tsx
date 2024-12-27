import { Circles } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader: React.FC = () => (
  <div className={styles.loader}>
    <Circles color="#3f51b5" height={50} width={50} />
  </div>
);

export default Loader;
