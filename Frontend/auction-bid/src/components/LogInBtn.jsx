import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogInBtn = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
      onClick={handleLogin}
    >
      Login
    </button>
  );
};
