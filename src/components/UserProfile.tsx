import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from '../styles/UserProfile.module.css';

export default function UserProfile() {
  const { user } = useSelector((state: RootState) => state.github);

  if (!user) return null;

  return (
    <div className={styles.profile}>
      <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <h2 className={styles.name}>{user.name || user.login}</h2>
      {user.bio && <p className={styles.bio}>{user.bio}</p>}
      <p className={styles.stats}>
        Public Repositories: {user.public_repos}
      </p>
    </div>
  );
}