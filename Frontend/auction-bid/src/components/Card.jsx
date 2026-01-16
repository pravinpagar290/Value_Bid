import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Card = ({
  imgSrc,
  title,
  startingBid,
  startTime,
  endTime,
  id,
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

  return (
    <Link
      to={`/auction/item/${id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {timeLeft.type === 'Ended' ? 'Closed' : 'Live'}
        </div>
      </div>

      <div className="p-5 flex flex-col grow">
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {title}
        </h2>

        <div className="mt-auto space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">
                Current Bid
              </p>
              <p className="text-lg font-black text-gray-900">
                ₹{startingBid?.toLocaleString()}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-xl ${
              timeLeft.type === 'Ends In:'
                ? 'bg-white text-gray-900'
                : timeLeft.type === 'Starts In:'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'bg-gray-100 text-gray-500'
            }`}
          >
            <span className="text-xs font-bold uppercase">{timeLeft.type}</span>
            <span className="text-sm font-mono font-bold">
              {timeLeft.type === 'Ended'
                ? 'Auction Closed'
                : formatTimeLeft(timeLeft)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
