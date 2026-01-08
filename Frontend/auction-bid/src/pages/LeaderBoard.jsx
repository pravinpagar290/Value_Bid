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
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>
            <CiTrophy /> Auction Leaderboard
          </h1>
          <div>
            <h1>Top Collectors</h1>
            <table>
              <thead>
                <tr>
                  <th>Profile Pic</th>
                  <th>Name</th>
                  <th>Bid Expenditure</th>
                  <th>Auction Won</th>
                </tr>
              </thead>
              <tbody>
                {leaderBoard.slice(0, 100).map((Element, index) => (
                  <tr key={Element._id}>
                    <td>
                      <span>{index + 1}</span>
                      <span>
                        <img
                          src={Element.profileImage?.url}
                          alt={Element.username}
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </span>
                    </td>
                    <td>{Element.username}</td>
                    <td>{Element.moneySpent}</td>
                    <td>{Element.auctionWon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeaderBoard;
