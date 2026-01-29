import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaChartLine, FaRegClock } from 'react-icons/fa';

export const Card = ({
  imgSrc,
  title,
  startingBid,
  startTime,
  endTime,
  id,
  seller,
  currentBid,
  bidCount = 0,
}) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;

    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: 'Starts In:',
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: 'Ends In:',
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    } else {
      timeLeft = { type: 'Ended', days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, '0');
    if (days > 0) {
      return `${days}d ${pad(hours)}h ${pad(minutes)}m`;
    }
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  const displayPrice = currentBid > 0 ? currentBid : startingBid;

  return (
    <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-900">
        <Link to={`/auction/item/${id}`}>
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        </Link>
        <div className="absolute top-4 right-4">
          {timeLeft.type === 'Starts In:' ? (
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">
              Upcoming
            </span>
          ) : timeLeft.type === 'Ended' ? (
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">
              Closed
            </span>
          ) : (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md animate-pulse">
              Live
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow">
        <div className="mb-4">
          <Link to={`/auction/item/${id}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
              {title}
            </h2>
          </Link>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaUserCircle className="text-gray-500 text-lg" />
            <span className="font-medium text-gray-600">
              {seller || 'Unknown Seller'}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            Current Bid
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-green-600">
              ₹{displayPrice?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <FaChartLine className="text-gray-500" />
            <span className="font-bold">{bidCount} bids</span>
            <span className="text-gray-400">•</span>
            <span>Starting: ₹{startingBid?.toLocaleString()}</span>
          </div>
        </div>

        {/* Timer Box */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100">
            <FaRegClock />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">
              {timeLeft.type === 'Ended' ? 'Auction Status' : 'Time Remaining'}
            </p>
            <p className="text-lg font-black text-gray-900">
              {timeLeft.type === 'Ended' ? 'Ended' : formatTimeLeft(timeLeft)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {timeLeft.type !== 'Ended' ? (
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <Link
              to={`/auction/item/${id}`}
              className="flex justify-center items-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              {timeLeft.type === 'Starts In:' ? 'View Details' : 'Place Bid'}
            </Link>
            <button className="flex justify-center items-center bg-white border border-gray-200 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              Watch
            </button>
          </div>
        ) : (
          <div className="mt-auto">
            <Link
              to={`/auction/item/${id}`}
              className="flex justify-center items-center bg-gray-200 text-gray-600 py-3 rounded-xl font-bold cursor-not-allowed"
            >
              Auction Ended
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
