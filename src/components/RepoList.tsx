import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setSelectedRepo, fetchReadme } from "../store/githubSlice";
import styles from "../styles/RepoList.module.css";

export default function RepoList() {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, users, selectedRepo } = useSelector(
    (state: RootState) => state.github
  );

  const handleRepoClick = async (repoName: string) => {
    dispatch(setSelectedRepo(repoName));
    if (users) {
      await dispatch(fetchReadme({ owner: users.login, repo: repoName }));
    }
  };

  return (
    <div className={styles.repoList}>
      <h3>Repositories</h3>
      <div className={styles.list}>
        {repos.map((repo) => (
          <div
            key={repo.id}
            className={`${styles.repo} ${
              selectedRepo === repo.name ? styles.selected : ""
            }`}
            onClick={() => handleRepoClick(repo.name)}
          >
            <h4>{repo.name}</h4>
            {repo.description && <p>{repo.description}</p>}
            <div className={styles.stats}>
              <span>⭐ {repo.stargazers_count}</span>
              {repo.language && <span>🔵 {repo.language}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
