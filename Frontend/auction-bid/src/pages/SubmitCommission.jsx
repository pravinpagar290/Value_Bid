import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
import { FaCloudUploadAlt } from 'react-icons/fa';

const SubmitCommission = () => {
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProof(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!proof) {
      toast.error('Please upload payment proof.');
      return;
    }

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('comment', comment);
    formData.append('proof', proof);

    setLoading(true);
    try {
      const { data } = await api.post('/commission/proof', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(data.message);
      setAmount('');
      setComment('');
      setProof(null);
      navigate('/me');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4 shadow-sm">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          Submit Commission
        </h2>
        <p className="text-gray-500 mb-8 font-medium">
          Upload your payment proof to settle your unpaid commissions.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Amount Paid (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Comment / Payment Reference
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Transaction ID, Bank Name"
              rows="3"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Payment Screenshot
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition-all bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCloudUploadAlt className="text-4xl text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-bold text-indigo-600">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG or JPEG (MAX. 5MB)
                  </p>
                  {proof && (
                    <p className="mt-2 text-sm text-green-600 font-bold">
                      Selected: {proof.name}
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? 'Submitting...' : 'Submit Payment Proof'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
