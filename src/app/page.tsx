'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUser, fetchUserRepos } from '../store/githubSlice';
import SearchBar from '../components/SearchBar';
import UserProfile from '../components/UserProfile';
import RepoList from '../components/RepoList';
import ReadmeViewer from '../components/ReadmeViewer';
import styles from '../styles/Home.module.css';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.github);
  const [username, setUsername] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    await dispatch(fetchUser(username));
    await dispatch(fetchUserRepos(username));
  };

  return (
    <main className={styles.main}>
      <SearchBar 
        username={username} 
        setUsername={setUsername} 
        onSubmit={handleSearch} 
      />
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {user && (
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <UserProfile />
            <RepoList />
          </div>
          <div className={styles.rightPanel}>
            <ReadmeViewer />
          </div>
        </div>
      )}
    </main>
  );
}