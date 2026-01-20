import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSinglePaymentProofDetail,
  updatePaymentProof,
  clearAllAdminErrors,
} from '../../store/Slices/adminSlice';
import { Loader } from '../../components/Loader';
import { toast } from 'react-hot-toast';

const PaymentProofDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singlePaymentProof, loading, error } = useSelector(
    (state) => state.admin
  );

  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(getSinglePaymentProofDetail(id));
    return () => {
      dispatch(clearAllAdminErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePaymentProof) {
      setStatus(singlePaymentProof.status || 'Pending');
      setAmount(singlePaymentProof.amount || '');
    }
  }, [singlePaymentProof]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePaymentProof(id, status, amount));
    // Ideally we might want to navigate back or just show success
  };

  // Since backend might verify files, assuming view logic here:
  // This assumes the proof has 'proof' or 'screenshot' object with url
  // Based on admin.controller it calls PaymentProof.findById
  // PaymentProof model import shows `PaymentProof` from `commission.model.js`. let's check structure if needed.
  // For now assuming typical structure or simple rendering of what is returned.

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">
              Payment Proof Detail
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              &larr; Back
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="p-6">
              {singlePaymentProof ? (
                <div className="space-y-6">
                  {/* Image Proof */}
                  <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                    {singlePaymentProof.proof?.url ? (
                      <img
                        src={singlePaymentProof.proof.url}
                        alt="Payment Proof"
                        className="max-h-96 object-contain rounded-md shadow-sm"
                      />
                    ) : (
                      <p className="text-gray-500">No image proof available.</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                        User ID
                      </h4>
                      <p className="text-gray-900 font-semibold">
                        {singlePaymentProof.userId}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Uploaded At
                      </h4>
                      <p className="text-gray-900 font-semibold">
                        {new Date(
                          singlePaymentProof.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Pass/Comment
                      </h4>
                      <p className="text-gray-900">
                        {singlePaymentProof.comment || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleUpdate}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Update Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Settled">Settled</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Update Proof
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center text-red-500">
                  Details not found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentProofDetail;
