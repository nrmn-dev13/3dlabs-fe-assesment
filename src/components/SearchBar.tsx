import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  username: string;
  setUsername: (username: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SearchBar({
  username,
  setUsername,
  onSubmit,
}: SearchBarProps) {
  return (
    <div className={styles.container}>
      <h1>Github Searcher</h1>
      <form className={styles.searchBar} onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
}
