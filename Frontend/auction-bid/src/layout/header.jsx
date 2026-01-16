import React from 'react';
import { CiMenuBurger, CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogOutBtn } from '../components/LogOutBtn';
import { LogInBtn } from '../components/LogInBtn';

const Header = ({ onOpenSidebar }) => {
  const { isAuthenticate } = useSelector((state) => state.user);

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <CiMenuBurger className="text-xl" />
        </button>
        <Link to="/" className="text-xl font-bold text-gray-800">
          ValueBid
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to={'/cart'} className="p-2 hover:bg-gray-100 rounded-full">
          <CiShoppingCart className="text-xl" />
        </Link>
        {isAuthenticate ? <LogOutBtn /> : <LogInBtn />}
      </div>
    </div>
  );
};

export default Header;
