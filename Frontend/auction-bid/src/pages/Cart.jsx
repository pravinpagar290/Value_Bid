import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWonAuctions } from '../store/Slices/auctionSlice';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { myWonAuctions, loading } = useSelector((state) => state.auction);
  const { isAuthenticate } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticate) {
      dispatch(getWonAuctions());
    }
  }, [dispatch, isAuthenticate]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8">My Winnings</h1>

        {!myWonAuctions || myWonAuctions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="mb-6 bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Winnings Yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't won any auctions yet. Start bidding to win exclusive
              items!
            </p>
            <Link
              to="/auctions"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all"
            >
              Explore Auctions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {myWonAuctions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={item.image?.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-500">
                    <p>
                      Winning Bid:{' '}
                      <span className="text-green-600 font-bold text-lg">
                        ₹{item.currentBid}
                      </span>
                    </p>
                    <p>
                      Auctioneer:{' '}
                      <span className="font-bold">
                        {item.createdBy?.username}
                      </span>
                    </p>
                    <p>
                      Email:{' '}
                      <span className="font-bold">{item.createdBy?.email}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex gap-3">
                  <Link
                    to={`/auction/details/${item._id}`}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    View
                  </Link>
                  <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
