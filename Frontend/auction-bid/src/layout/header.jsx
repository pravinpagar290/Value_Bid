import logo from '../assets/logo-1.png';
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
        <Link to="/">
          <img src={logo} alt="ValueBid" className="h-12 w-auto" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to={'/my-winnings'} className="p-2 hover:bg-gray-100 rounded-full">
          <CiShoppingCart className="text-xl" />
        </Link>
        {isAuthenticate ? <LogOutBtn /> : <LogInBtn />}
      </div>
    </div>
  );
};

export default Header;
