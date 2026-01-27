import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Card } from '../components/Card';
import { getAllItem } from '../store/Slices/auctionSlice';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { CiFilter } from 'react-icons/ci';

const FilterAuctions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAuctions, loading } = useSelector((state) => state.auction);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Extract unique categories from auctions
  const categories = [
    ...new Set(allAuctions?.map((auction) => auction.category) || []),
  ].filter(Boolean);

  // Debounced search function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch auctions with filters
  const fetchAuctions = useCallback(() => {
    const filters = {
      search: searchTerm,
      category: selectedCategory,
      condition: selectedCondition,
      status: selectedStatus,
      sortBy: sortBy,
    };
    dispatch(getAllItem(filters));
  }, [
    dispatch,
    searchTerm,
    selectedCategory,
    selectedCondition,
    selectedStatus,
    sortBy,
  ]);

  // Debounced search
  const debouncedFetch = useCallback(debounce(fetchAuctions, 500), [
    fetchAuctions,
  ]);

  // Fetch on mount and when filters change
  useEffect(() => {
    if (searchTerm) {
      debouncedFetch();
    } else {
      fetchAuctions();
    }
  }, [selectedCategory, selectedCondition, selectedStatus, sortBy]);

  // Trigger search on searchTerm change
  useEffect(() => {
    if (searchTerm) {
      debouncedFetch();
    } else {
      fetchAuctions();
    }
  }, [searchTerm]);

  // Initial load
  useEffect(() => {
    fetchAuctions();
  }, []);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedStatus('all');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <CiFilter className="text-4xl text-indigo-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Filter Auctions
            </h1>
            <p className="text-gray-600 mt-1">
              Search and filter auctions to find exactly what you're looking for
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Auctions
          </label>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or description..."
          />
        </div>

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedCondition={selectedCondition}
          onConditionChange={setSelectedCondition}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Results Info & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <p className="text-gray-600 text-lg font-medium">
              {loading
                ? 'Loading...'
                : `${allAuctions?.length || 0} auctions found`}
            </p>
            {(searchTerm ||
              selectedCategory !== 'all' ||
              selectedCondition !== 'all' ||
              selectedStatus !== 'all') && (
              <p className="text-sm text-gray-500 mt-1">
                Active filters applied
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all"
            >
              Reset Filters
            </button>
            <button
              onClick={() => navigate('/auctions')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-all"
            >
              View All Auctions
            </button>
          </div>
        </div>
      </div>

      {/* Auction Grid */}
      {loading ? (
        <Loader />
      ) : allAuctions && allAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allAuctions.map((item) => (
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
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <CiFilter className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium mb-2">
            No auctions found matching your criteria
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Try adjusting your filters or search terms
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => navigate('/auctions')}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all"
            >
              Browse All Auctions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterAuctions;
