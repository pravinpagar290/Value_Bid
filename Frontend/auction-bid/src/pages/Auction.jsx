import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader';
import { Card } from '../components/Card';
import { getAllItem } from '../store/Slices/auctionSlice';

const Auctions = () => {
  const dispatch = useDispatch();
  const { allAuctions, loading } = useSelector((state) => state.auction);

  useEffect(() => {
    if (allAuctions.length === 0) {
      dispatch(getAllItem());
    }
  }, [dispatch, allAuctions.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Auctions</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allAuctions?.map((item) => (
            <Card
              key={item._id}
              imgSrc={item.image?.url}
              title={item.title}
              startingBid={item.startingBid}
              startTime={item.startTime}
              endTime={item.endTime}
              id={item._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Auctions;
