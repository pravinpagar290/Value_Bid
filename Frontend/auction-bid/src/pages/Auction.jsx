import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader';
import { Card } from '../components/Card'

const Auctions = () => {
  const { allAuction, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  return <div>{loading ? <Loader /> : <div><h1>Auction</h1>
  <div>
    {allAuction?.map((index)=>{<Card
    imgSrc={index.image.url}
    title={index.title}
    startingBid={index.startingBid}
    startTime={index.startTime}
    endTime={index.endTime}
    id={index._id}
    />})}
  </div>
  </div>}</div>;
};


export default Auctions;