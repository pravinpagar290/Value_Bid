import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getAuctionDetail } from '../store/Slices/auctionSlice';
import { Loader } from '../components/Loader';

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticate } = useSelector((state) => state.user);
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );

  useEffect(() => {
    if (!isAuthenticate || user.role === 'bidder') {
      navigate('/');
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [id, isAuthenticate, user.role, dispatch, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <div className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            Seller Dashboard
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Detail Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="aspect-video relative">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-5 py-2 bg-black/60 backdrop-blur-md text-white rounded-2xl text-xs font-bold uppercase tracking-widest">
                    {auctionDetail.category}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <h1 className="text-4xl font-black text-gray-900 mb-6">
                  {auctionDetail.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
                  {auctionDetail.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                      Starting Bid
                    </p>
                    <p className="text-2xl font-black text-gray-900">
                      ₹{auctionDetail.startingBid}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                      Current Bid
                    </p>
                    <p className="text-2xl font-black text-indigo-600">
                      ₹{auctionDetail.currentBid || auctionDetail.startingBid}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                      Condition
                    </p>
                    <p className="text-2xl font-black text-gray-900 capitalize">
                      {auctionDetail.condition}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Stats */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-around text-center">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                  Start Time
                </p>
                <p className="font-bold text-gray-800">
                  {new Date(auctionDetail.startTime).toLocaleString()}
                </p>
              </div>
              <div className="w-px h-12 bg-gray-100"></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                  End Time
                </p>
                <p className="font-bold text-gray-800">
                  {new Date(auctionDetail.endTime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Bidders Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-[700px]">
              <div className="p-8 border-b border-gray-50">
                <h2 className="text-2xl font-black text-gray-900">
                  Active Bids
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Real-time bidding history
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-4">
                {auctionBidders && auctionBidders.length > 0 ? (
                  auctionBidders.map((bid, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-5 rounded-2xl border ${
                        index === 0
                          ? 'bg-indigo-50 border-indigo-100'
                          : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            index === 0
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white text-gray-400'
                          }`}
                        >
                          {bid.userName?.charAt(0) || 'B'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {bid.userName}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                            {index === 0 ? 'Leading Bid' : 'Previous Bid'}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`font-black text-lg ${index === 0 ? 'text-indigo-600' : 'text-gray-900'}`}
                      >
                        ₹{bid.amount}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400 font-medium italic">
                      No bids placed yet.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-gray-50 rounded-b-3xl border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Total Bidders: {auctionBidders?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAuctionDetails;
