import React from 'react';
import { CiMenuBurger, CiUser, CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ onOpenSidebar }) => {
  const { isAuthenticate } = useSelector((state) => state.user);

  return (
    <div>
      <button onClick={onOpenSidebar}>
        <CiMenuBurger />
      </button>
      <button>
        <Link to={'/cart'}>
          <CiShoppingCart />
        </Link>
      </button>
      {isAuthenticate ? null : (
        <button>
          <Link to={'/signup'}>
            <CiUser />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Header;
