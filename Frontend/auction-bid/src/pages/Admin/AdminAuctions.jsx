import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItem } from '../../store/Slices/auctionSlice';
import { deleteAuctionItem } from '../../store/Slices/adminSlice';
import { Loader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';

const AdminAuctions = () => {
  const dispatch = useDispatch();
  const { allAuctions, loading: auctionLoading } = useSelector(
    (state) => state.auction
  );
  const { loading: adminLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllItem());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm('Are you definitely sure you want to delete this auction?')
    ) {
      dispatch(deleteAuctionItem(id));
    }
  };

  const loading = auctionLoading || adminLoading;

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Auctions</h1>
        </div>

        {loading && allAuctions.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {allAuctions && allAuctions.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Highest Bid</th>
                      <th className="px-6 py-4">Ends At</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                    {allAuctions.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={item.image?.url}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-xs">
                          {item.title}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(item.endTime) < new Date() ? (
                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-bold">
                              Ended
                            </span>
                          ) : (
                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          ${item.currentBid || item.startingBid}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(item.endTime).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Link
                            to={`/auction/details/${item._id}`}
                            className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors inline-block"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors inline-block"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  No auctions found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminAuctions;
