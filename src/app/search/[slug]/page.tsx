"use client";
import { fetchUser, fetchUserRepos } from "@/store/githubSlice";
import { use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import UserProfile from "@/components/UserProfile";
import RepoList from "@/components/RepoList";
import Modal from "@/components/Modal";
import ReadmeViewer from "@/components/ReadmeViewer";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

type PageProps = {
  params: Promise<{ slug: string }>; // `params` is now a Promise
};

const DetailPage = ({ params }: PageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.github
  );

  // ✅ Unwrap the params using `use()`
  const { slug } = use(params);

  const handleFetch = async () => {
    await dispatch(fetchUser(slug));
    await dispatch(fetchUserRepos(slug));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className={styles.main}>
      {loading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loader}></div>
        </div>
      )}
      {user && (
        <div>
          <Link href="/search" className={styles.back}>
            <IoMdArrowRoundBack />
          </Link>
          <UserProfile />
          {error && <div className={styles.error}>{error}</div>}
          <RepoList />
          <div>
            <Modal>
              {error ? (
                <div className={styles.error}>{error}</div>
              ) : (
                <ReadmeViewer />
              )}
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
