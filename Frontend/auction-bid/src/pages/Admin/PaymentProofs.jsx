import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPaymentProofs,
  deletePaymentProof,
  updatePaymentProof,
} from '../../store/Slices/adminSlice';
import { Loader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { FaTrash, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

const PaymentProofs = () => {
  const dispatch = useDispatch();
  const { paymentProofs, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllPaymentProofs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment proof?')) {
      dispatch(deletePaymentProof(id));
    }
  };

  const handleUpdateStatus = (id, status, amount) => {
    dispatch(updatePaymentProof(id, status, amount));
  };

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Payment Proofs Review
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {paymentProofs && paymentProofs.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">User ID</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Uploaded At</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                    {paymentProofs.map((proof) => (
                      <tr
                        key={proof._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {proof.userId}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              proof.status === 'Approved'
                                ? 'bg-green-100 text-green-700'
                                : proof.status === 'Rejected'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {proof.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">${proof.amount}</td>
                        <td className="px-6 py-4">
                          {new Date(proof.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right space-x-3">
                          <Link
                            to={`/admin/payment-proofs/${proof._id}`}
                            className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors inline-block"
                            title="View Detail"
                          >
                            <FaEye />
                          </Link>
                          {proof.status === 'Pending' && (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    proof._id,
                                    'Approved',
                                    proof.amount
                                  )
                                }
                                className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100 transition-colors inline-block"
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    proof._id,
                                    'Rejected',
                                    proof.amount
                                  )
                                }
                                className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors inline-block"
                                title="Reject"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(proof._id)}
                            className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors inline-block"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  No payment proofs found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentProofs;
