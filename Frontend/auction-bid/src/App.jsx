import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/leader-board' element={<LeaderBoard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
