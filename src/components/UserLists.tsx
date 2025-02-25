import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaLocationDot } from "react-icons/fa6";
import { PiBuildingOffice } from "react-icons/pi";
import styles from "../styles/UserProfile.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserProfile() {
  const { items } = useSelector((state: RootState) => state.github);

  if (!items) return null;
  const router = useRouter();

  const goToDetail = (name: string) => {
    router.push(`/search/${name}`);
  };

  return (
    
    <div>
      {items && <div className="cards-wrapper">
        {items.map((item) => (
          <div className="custom-cards" key={item.id}>
            <Link
              href={`/search/${item.login}`}
              className="custom-cards-wrapper"
            >
              <div className="custom-cards-wrapper-img">
                <img src={item.avatar_url} alt="image" />
              </div>
              <div className="custom-cards-wrapper-title">
                <span>{item.login}</span>
              </div>
            </Link>
            {/* <div
              className="custom-cards-wrapper"
              onClick={() => {
                goToDetail(item.login);
              }}
            >
              <div className="custom-cards-wrapper-img">
                <img src={item.avatar_url} alt="image" />
              </div>
              <div className="custom-cards-wrapper-title">
                <span>{item.login}</span>
              </div>
            </div> */}
          </div>
        ))}
      </div>}
    </div>
  );
}
