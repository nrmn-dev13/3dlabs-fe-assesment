"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUser, fetchItems, fetchUserRepos } from "../../store/githubSlice";
import SearchBar from "../../components/SearchBar";
//import UserProfile from "../../components/UserProfile";
import UserLists from "../../components/UserLists";
import RepoList from "../../components/RepoList";
import ReadmeViewer from "../../components/ReadmeViewer";
import styles from "../../styles/Home.module.css";
import Modal from "@/components/Modal";


export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.github
  );
  const [username, setUsername] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    await dispatch(fetchItems(username));
    // await dispatch(fetchUserRepos(username));
  };

  return (
    <main className={styles.main}>
      <SearchBar
        username={username}
        setUsername={setUsername}
        onSubmit={handleSearch}
      />

      {loading && 
        <div className={styles.loaderOverlay}>
          <div className={styles.loader}></div>
        </div>
      }
      {error && <div className={styles.error}>{error}</div>}
      {items && (
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <UserLists />
            {/* <RepoList /> */}
          </div>
          {/* <div className={styles.rightPanel}>
            <Modal>
              <ReadmeViewer />
            </Modal>
          </div> */}
        </div>
      )}
    </main>
  );
}
