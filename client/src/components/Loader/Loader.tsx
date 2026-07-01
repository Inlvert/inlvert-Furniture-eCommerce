import styles from "./Loader.module.scss";

export default function Loader({ text = "Starting the Server..." }) {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContent}>
        <p className={styles.loaderTitle}>
          {`The backend is hosted on a free-tier service and may require 30–60 seconds to wake up after a period of inactivity.\n Please keep this page open. It will load automatically once the server is ready.\n Thank you for your patience!`}
        </p>
        <div className={styles.loaderCover}>
          <div className={styles.loaderSpinner} />
          <p className={styles.loaderTitle}>{text}</p>
        </div>
      </div>
    </div>
  );
}
