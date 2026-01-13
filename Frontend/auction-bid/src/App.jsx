import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Signup from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
import UserProfile from './pages/UserProfile.jsx';
import { fetchUser } from './store/Slices/userSlice';

import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/me" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
