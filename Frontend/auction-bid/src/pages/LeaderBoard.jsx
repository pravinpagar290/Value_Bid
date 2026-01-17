import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader.jsx';
import { CiTrophy } from 'react-icons/ci';
import { fetchLeaderBoard } from '../store/Slices/userSlice.js';

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const { loading, leaderBoard } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(fetchLeaderBoard());
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-white p-8 text-black border-b-1">
            <div className="flex items-center gap-4 mb-2">
              <CiTrophy className="text-5xl text-black" />
              <h1 className="text-3xl font-light">Auction Leaderboard</h1>
            </div>
            <p className="text-black-100 ml-16">
              Recognizing our top collectors and most active bidders
            </p>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              Top Collectors
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-100">
                    <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wider">
                      User
                    </th>
                    <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wider text-right">
                      Bid Expenditure
                    </th>
                    <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wider text-center">
                      Auctions Won
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(leaderBoard || []).slice(0, 100).map((Element, index) => (
                    <tr
                      key={Element._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 px-4">
                        <span
                          className={`font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full ${
                            index === 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : index === 1
                                ? 'bg-gray-100 text-gray-700'
                                : index === 2
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'text-gray-500'
                          }`}
                        >
                          #{index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={Element.profileImage?.url}
                            alt={Element.username}
                            className="h-10 w-10 object-cover rounded-full border-2 border-white shadow-sm"
                          />
                          <span className="font-medium text-gray-900">
                            {Element.username}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-bold text-indigo-600">
                          ${Element.moneySpent?.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {Element.auctionWon} Wins
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {leaderBoard?.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No data available yet.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default LeaderBoard;
