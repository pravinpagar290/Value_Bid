import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { createAuction } from '../store/Slices/auctionSlice.js';

export const CreateAuction = () => {
  const [condition, setCondition] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction || state);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('category', category);
    form.append('condition', condition);
    form.append('startingBid', startingBid);
    form.append('startTime', startTime);
    form.append('endTime', endTime);
    if (image) {
      form.append('image', image);
    }

    dispatch(createAuction(form));
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>Create Auction</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <select
              name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used">Used</option>
            </select>

            <input
              type="number"
              name="startingBid"
              placeholder="Starting Bid"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              required
            />

            <label>Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />

            <label>End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />

            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleImageChange}
              required
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}

            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Auction'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};
