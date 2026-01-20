import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMonthlyRevenue,
  getAllUsers,
  clearAllAdminErrors,
} from '../../store/Slices/adminSlice';
import { Loader } from '../../components/Loader';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaGavel } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, monthlyRevenue, totalAuctioneers, totalBidders, error } =
    useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());

    return () => {
      dispatch(clearAllAdminErrors());
    };
  }, [dispatch]);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-100">
      <div className={`p-4 rounded-full ${color} text-white text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  const totalRevenue = monthlyRevenue.reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <section className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value={`$${totalRevenue.toLocaleString()}`}
                  icon={<FaMoneyBillWave />}
                  color="bg-green-500"
                />
                <StatCard
                  title="New Bidders (Year)"
                  value={totalBidders.reduce((a, b) => a + b, 0)}
                  icon={<FaUsers />}
                  color="bg-blue-500"
                />
                <StatCard
                  title="New Auctioneers (Year)"
                  value={totalAuctioneers.reduce((a, b) => a + b, 0)}
                  icon={<FaGavel />}
                  color="bg-indigo-500"
                />
                <StatCard
                  title="Active Month Revenue"
                  value={`$${monthlyRevenue[new Date().getMonth()] || 0}`}
                  icon={<FaChartLine />}
                  color="bg-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Monthly Revenue
                  </h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {monthlyRevenue.map((rev, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-full group relative"
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                          ${rev}
                        </div>
                        <div
                          className="w-full bg-green-500 rounded-t-sm hover:bg-green-600 transition-all duration-300"
                          style={{
                            height: `${
                              rev === 0
                                ? 2
                                : (rev / Math.max(...monthlyRevenue, 1)) * 100
                            }%`,
                          }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">
                          {months[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Users Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    User Registrations
                  </h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {totalBidders.map((bidders, index) => {
                      const auctioneers = totalAuctioneers[index];
                      const total = bidders + auctioneers;
                      const maxTotal = Math.max(
                        ...totalBidders.map((b, i) => b + totalAuctioneers[i]),
                        1
                      );

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center w-full group relative"
                        >
                          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                            {bidders} Bidders, {auctioneers} Sellers
                          </div>
                          <div
                            className="w-full flex bg-gray-100 rounded-t-sm h-full flex-col-reverse justify-start relative transition-all duration-300"
                            style={{
                              height: `${total === 0 ? 2 : (total / maxTotal) * 100}%`,
                            }}
                          >
                            <div
                              className="w-full bg-blue-500"
                              style={{ height: `${(bidders / total) * 100}%` }}
                            ></div>
                            <div
                              className="w-full bg-indigo-500"
                              style={{
                                height: `${(auctioneers / total) * 100}%`,
                              }}
                            ></div>
                          </div>

                          <span className="text-xs text-gray-500 mt-2">
                            {months[index]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center mt-4 space-x-4">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-500">Bidders</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-500">Sellers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
