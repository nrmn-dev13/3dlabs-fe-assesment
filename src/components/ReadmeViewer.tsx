import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { marked } from 'marked';
import styles from '../styles/ReadmeViewer.module.css';

export default function ReadmeViewer() {
  const { readmeContent, selectedRepo } = useSelector((state: RootState) => state.github);

  if (!selectedRepo || !readmeContent) {
    return (
      <div className={styles.placeholder}>
        Select a repository to view its README
      </div>
    );
  }

  const htmlContent = marked(readmeContent);

  return (
    <div className={styles.readme}>
      <h3>{selectedRepo} README</h3>
      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}