"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUser, fetchUserRepos } from "../../store/githubSlice";
import SearchBar from "../../components/SearchBar";
import UserProfile from "../../components/UserProfile";
import UsersList from "../../components/UsersList";
import RepoList from "../../components/RepoList";
import ReadmeViewer from "../../components/ReadmeViewer";
import styles from "../../styles/Home.module.css";
import Modal from "../../components/Modal";
import { openModal } from "@/store/modalSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.github
  );
  const [username, setUsername] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    await dispatch(fetchUser(username));
    setUsername("");
    await dispatch(fetchUserRepos(username));
  };

  return (
    <main className={styles.main}>
      <SearchBar
        username={username}
        setUsername={setUsername}
        onSubmit={handleSearch}
      />
      <button onClick={() => dispatch(openModal())}>Open Modal</button>
      {/* <Modal>
        <h1>Hello this is modal</h1>
      </Modal> */}
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {user && (
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <UsersList />
            <RepoList />
          </div>
          <div className={styles.rightPanel}>
            <Modal>
              <ReadmeViewer />
            </Modal>
          </div>
        </div>
      )}
    </main>
  );
}
