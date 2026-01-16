import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-1.png';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="ValueBid" className="h-10 w-auto" />
            </Link>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              The premium marketplace for exclusive auctions. Discover unique
              treasures, bid in real-time, and join a community of passionate
              collectors.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/auctions"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Live Auctions
                </Link>
              </li>
              <li>
                <Link
                  to="/leader-board"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/create-auction"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Start Selling
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 text-center md:text-left">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ValueBid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
