import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Signup from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Auctions from './pages/Auction.jsx';
import { CreateAuction } from './pages/CreateAuction.jsx';
import AuctionItem from './pages/AuctionItem.jsx';
import ViewAuctionDetails from './pages/ViewAuctionDetails.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
import UserProfile from './pages/UserProfile.jsx';
import MyAuction from './pages/MyAuction.jsx';
import Cart from './pages/Cart.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import PaymentProofs from './pages/Admin/PaymentProofs.jsx';
import PaymentProofDetail from './pages/Admin/PaymentProofDetail.jsx';
import AdminAuctions from './pages/Admin/AdminAuctions.jsx';
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
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route path="/auction/item/:id" element={<AuctionItem />} />
          <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/me" element={<UserProfile />} />
          <Route path="/my-auctions" element={<MyAuction />} />
          <Route path="/my-winnings" element={<Cart />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/payment-proofs" element={<PaymentProofs />} />
          <Route
            path="/admin/payment-proofs/:id"
            element={<PaymentProofDetail />}
          />
          <Route path="/admin/auctions" element={<AdminAuctions />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
