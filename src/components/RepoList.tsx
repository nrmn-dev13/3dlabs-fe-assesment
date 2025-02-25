import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setSelectedRepo, fetchReadme } from "../store/githubSlice";
import styles from "../styles/RepoList.module.css";
import { openModal } from "@/store/modalSlice";
import { FaRegStar, FaCode } from "react-icons/fa";

export default function RepoList() {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, user, selectedRepo } = useSelector(
    (state: RootState) => state.github
  );

  const handleRepoClick = async (repoName: string) => {
    console.log(repoName);
    
    dispatch(setSelectedRepo(repoName));
    dispatch(openModal())
    if (user) {
      await dispatch(fetchReadme({ owner: user.login, repo: repoName }));
    }
  };

  return (
    <div className={styles.repoList}>
      <h3>Repositories</h3>
      <div className={styles.cardsWrapper}>
        {repos.length === 0 && <p>Doesn't have yet any repository</p>}
        
        {repos.map((repo) => (
          <div
            key={repo.id}
            className={`${styles.customCards} ${
              selectedRepo === repo.name ? styles.selected : ""
            }`}
            onClick={() => handleRepoClick(repo.name)}
          >
            <div className={styles.customCardsWrapper}>
              <h4 className={styles.title}>{repo.name}</h4>
              {repo.description && <p className={styles.description}>{repo.description}</p>}
              <div className={styles.stats}>
                <span><FaRegStar /> {repo.stargazers_count}</span>
                {repo.language && <span><FaCode /> {repo.language}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
