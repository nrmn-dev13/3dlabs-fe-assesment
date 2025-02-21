'use client';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { fetchUser, fetchUserRepos } from '../../../store/githubSlice';

const Child = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.github);
  const [username, setUsername] = useState('');

  useEffect(() => {
    
  },[])
    return (
      <div>
        <h1>Child Page haha</h1>
      </div>
    );
  };
  
  export default Child;
  