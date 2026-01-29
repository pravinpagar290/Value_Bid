import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/Slices/userSlice';

export const LogOutBtn = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <button
      className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};
