import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from "../styles/UserProfile.module.css";

export default function UserProfile() {
  const { users } = useSelector((state: RootState) => state.github);

  if (!users) return null;

  return (
    <div className="wrapper">
      <div className="cards-wrapper">
        {users.items.map((user) => (
          <div className="custom-cards" key={user.id}>
            <div className="custom-cards-wrapper">
              <div className="custom-cards-wrapper-img">
                <img src={user.avatar_url} alt="image" />
              </div>
              <div className="custom-cards-wrapper-title">
                <span>{user.login}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <h2 className={styles.name}>{user.name || user.login}</h2>
      {user.bio && <p className={styles.bio}>{user.bio}</p>}
      <p className={styles.stats}>
        Public Repositories: {user.public_repos}
      </p> */}
    </div>
  );
}
