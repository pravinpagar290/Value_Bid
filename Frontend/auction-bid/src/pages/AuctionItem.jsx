import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAuctionDetail } from '../store/Slices/auctionSlice';
import { bid } from '../store/Slices/bidSlice';
import {Loader} from '../components/Loader';
import { toast } from 'react-hot-toast';

const AuctionItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auctionDetail, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticate } = useSelector((state) => state.user);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    dispatch(getAuctionDetail(id));
  }, [dispatch, id]);

  const handleBid = (e) => {
    e.preventDefault();
    if (!isAuthenticate) {
      toast.error('Please login to place a bid');
      return;
    }
    dispatch(bid(id, { amount: bidAmount })).then(() => {
      dispatch(getAuctionDetail(id)); 
      setBidAmount('');
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          <img
            src={auctionDetail?.image?.url}
            alt={auctionDetail?.title}
            className="w-full h-full object-cover"
          />
        </div>


        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              {auctionDetail?.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                {auctionDetail?.category || 'General'}
              </span>
              <span className="text-gray-400 text-sm">Condition: Platinum</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Current Bid
                </p>
                <h2 className="text-5xl font-black text-gray-900">
                  ₹{auctionDetail?.currentBid || auctionDetail?.startingBid}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Starting Price
                </p>
                <p className="text-xl font-bold text-gray-400">
                  ₹{auctionDetail?.startingBid}
                </p>
              </div>
            </div>

            {/* Bidding Interface */}
            <form onSubmit={handleBid} className="space-y-4">
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white px-10 py-5 rounded-2xl outline-none transition-all font-bold text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all transform active:scale-[0.98] shadow-lg shadow-gray-200"
              >
                Place Bid Now
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                Auctioneer
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-400 border border-gray-100 uppercase">
                  {auctionDetail?.createdBy?.username?.charAt(0)}
                </div>
                <p className="font-bold text-gray-800">
                  {auctionDetail?.createdBy?.username}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                Bidders
              </p>
              <p className="text-xl font-black text-gray-900">
                {auctionDetail?.bidders?.length || 0}{' '}
                <span className="text-sm font-medium text-gray-400">
                  Active
                </span>
              </p>
            </div>
          </div>

          <div className="prose prose-blue max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              {auctionDetail?.description ||
                'No description provided for this item.'}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bids Table */}
      <div className="mt-24">
        <h2 className="text-3xl font-black text-gray-900 mb-10">
          Recent Bidding History
        </h2>
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Bidder
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {auctionDetail?.bidders && auctionDetail.bidders.length > 0 ? (
                auctionDetail.bidders.map((bid, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-8 py-5 font-bold text-gray-800">
                      {bid.userName}
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-blue-600 font-black">
                        ₹{bid.amount}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-gray-500 font-medium">
                      Recently
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${index === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {index === 0 ? 'Highest' : 'Outbid'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-10 text-center text-gray-400 font-medium"
                  >
                    No bids have been placed yet. Be the first!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
