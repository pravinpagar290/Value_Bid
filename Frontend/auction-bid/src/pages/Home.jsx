import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllItem } from '../store/Slices/auctionSlice';
import { Loader } from '../components/Loader';
import { Card } from '../components/Card';
import Logo2 from '../assets/Logo-2.png';

const Home = () => {
  const dispatch = useDispatch();
  const { allAuctions, loading } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getAllItem());
  }, [dispatch]);

  const featuredAuctions = allAuctions?.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>ValueBid - Home</title>
        <meta
          name="description"
          content="ValueBid is the premium marketplace for exclusive auctions. Discover unique treasures and bid in real-time."
        />
        <meta
          name="keywords"
          content="auction, bidding, detailed auctions, ValueBid, buy, sell"
        />
      </Helmet>
      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-light tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900">
              Discover Unique Treasures & Bid in Real-Time
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              ValueBid is the premium marketplace for exclusive auctions. Join
              our community of bidders and sellers to find rare items or list
              your own.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link
                to="/auctions"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-black hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300"
              >
                Start Bidding
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link
                to="/create-auction"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              >
                Create Auction
              </Link>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-4 lg:flex">
            <img src={Logo2} alt="mockup" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-screen-xl px-4 mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Featured Auctions
              </h2>
              <p className="mt-2 text-gray-500">
                Check out the latest items up for bidding.
              </p>
            </div>
            <Link
              to="/auctions"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              View All &rarr;
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAuctions && featuredAuctions.length > 0 ? (
                featuredAuctions.map((item) => (
                  <Card
                    key={item._id}
                    imgSrc={item.image?.url}
                    title={item.title}
                    startingBid={item.startingBid}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    id={item._id}
                    seller={item.createdBy?.username}
                    currentBid={item.currentBid}
                    bidCount={item.bids?.length}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No active auctions at the moment.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-screen-xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Register Account</h3>
              <p className="text-gray-500">
                Sign up easily to start bidding or selling items on our secure
                platform.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Place Bids</h3>
              <p className="text-gray-500">
                Find items you love and place your bids in real-time against
                others.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Win & Pay</h3>
              <p className="text-gray-500">
                Win the auction, make a secure payment, and get your item
                delivered.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
