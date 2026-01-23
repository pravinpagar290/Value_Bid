import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellers } from '../../store/Slices/adminSlice';
import { Loader } from '../../components/Loader';

const AdminSellers = () => {
  const dispatch = useDispatch();
  const { sellers, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Manage Sellers
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Seller
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Unpaid Commission
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sellers && sellers.length > 0 ? (
                    sellers.map((seller) => (
                      <tr
                        key={seller._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {seller.username}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {seller.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-bold ${seller.unpaidCommission > 0 ? 'text-red-600' : 'text-green-600'}`}
                          >
                            ₹{seller.unpaidCommission}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {seller.unpaidCommission > 0 ? (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                              Blocking New Auctions
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                              Active
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No sellers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminSellers;
