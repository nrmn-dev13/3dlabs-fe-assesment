import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaLocationDot } from "react-icons/fa6";
import { PiBuildingOffice } from "react-icons/pi";
import styles from "../styles/UserProfile.module.css";

export default function UserProfile() {
  const { user } = useSelector((state: RootState) => state.github);

  if (!user) return null;

  return (
    <div className={styles.userInfo}>
      {/* <div className="cards-wrapper">
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
      </div> */}
      <div className={styles.imageWrapper}>
        <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      </div>
      <h2 className={styles.name}>{user.name || user.login}</h2>
      <div className={styles.userDetail}>
        
        <div className={styles.followingWrapper}>
          <span>Following: {user.following}</span>
          <span>Followers: {user.followers}</span>
        </div>
        {user.location && <span className={styles.externalInfo}><FaLocationDot /> : {user.location}</span>}
        {user.company && <span className={styles.externalInfo}><PiBuildingOffice /> : {user.company}</span>}
        
      </div>
    </div>
  );
}
