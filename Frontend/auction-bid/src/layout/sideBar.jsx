import React from 'react';
import { TfiClose } from 'react-icons/tfi';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/Slices/userSlice';

const SideBar = ({ isOpen, onClose }) => {
  const { isAuthenticate, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/');
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900">ValueBid</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <TfiClose className="text-xl text-gray-500" />
          </button>
        </div>

        <nav className="p-6 space-y-4">
          <Link
            to="/"
            onClick={onClose}
            className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-all"
          >
            Home
          </Link>
          <Link
            to="/auctions"
            onClick={onClose}
            className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-all"
          >
            All Auctions
          </Link>
          <Link
            to="/leader-board"
            onClick={onClose}
            className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-all"
          >
            Leaderboard
          </Link>

          {isAuthenticate && user?.role === 'seller' && (
            <Link
              to="/create-auction"
              onClick={onClose}
              className="block px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold transition-all"
            >
              Create Auction
            </Link>
          )}

          <div className="border-t border-gray-100 my-4 pt-4">
            {isAuthenticate ? (
              <>
                <Link
                  to="/me"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-all"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-bold transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="block px-4 py-3 mt-2 rounded-xl bg-gray-900 text-white font-bold text-center transition-all hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
