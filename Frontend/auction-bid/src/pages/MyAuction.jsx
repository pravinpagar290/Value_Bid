import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyAuctionItem,
  deleteAuction,
  republishAuction,
} from '../store/Slices/auctionSlice';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye, FaSync } from 'react-icons/fa';

const MyAuction = () => {
  const dispatch = useDispatch();
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticate } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?._id && isAuthenticate) {
      dispatch(getMyAuctionItem(user._id));
    }
  }, [dispatch, user, isAuthenticate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this auction?')) {
      await dispatch(deleteAuction(id));
      toast.success('Auction deleted successfully');
      dispatch(getMyAuctionItem(user._id));
    }
  };

  const handleRepublish = async (id) => {
    await dispatch(republishAuction(id));
    toast.success('Auction republished successfully');
    dispatch(getMyAuctionItem(user._id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            My Auctions
          </h1>
          <Link
            to="/create-auction"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Create New Auction
          </Link>
        </div>

        {!myAuctions || myAuctions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="mb-6 bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🏷️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Auctions Yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't listed any items for auction yet. Start selling today!
            </p>
            <Link
              to="/create-auction"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all"
            >
              Create Your First Auction
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myAuctions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image?.url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        new Date(item.endTime) > new Date()
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {new Date(item.endTime) > new Date() ? 'Active' : 'Ended'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                        Current Bid
                      </p>
                      <p className="text-2xl font-black text-indigo-600">
                        ₹{item.currentBid || item.startingBid}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                        Starting
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{item.startingBid}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">
                    <Link
                      to={`/auction/details/${item._id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-bold text-sm"
                      title="View Details"
                    >
                      <FaEye /> View
                    </Link>

                    {new Date(item.endTime) < new Date() ? (
                      <button
                        onClick={() => handleRepublish(item._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-bold text-sm"
                        title="Republish Auction"
                      >
                        <FaSync /> Reactivate
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-300 rounded-lg cursor-not-allowed font-bold text-sm"
                        title="Cannot edit active auction"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-bold text-sm"
                      title="Delete Auction"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAuction;
