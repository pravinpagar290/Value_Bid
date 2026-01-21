import React, { useState } from 'react';
import {
  FaTimes,
  FaUniversity,
  FaPaypal,
  FaCloudUploadAlt,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PaymentMethod = ({ auctionItem, onClose }) => {
  const seller = auctionItem.createdBy;
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!image) {
      toast.error('Please upload a payment screenshot');
      return;
    }
    // TODO: Connect to backend API to submit payment proof for this auction
    toast.success('Payment proof submitted successfully! (Demo)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Payment Details
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Pay to <span className="text-indigo-600">{seller.username}</span>{' '}
              to claim your item
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all shadow-sm border border-gray-100"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          {/* Amount Section */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center border border-indigo-100">
            <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider mb-1">
              Total Amount to Pay
            </p>
            <p className="text-4xl font-black text-indigo-700">
              ₹{auctionItem.currentBid}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bank Details */}
            {seller.paymentMethods?.bankTransfer && (
              <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-indigo-300 transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-gray-800">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <FaUniversity className="text-xl" />
                  </div>
                  <h3 className="font-bold text-lg">Bank Transfer</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Bank</span>
                    <span className="font-bold text-gray-900 text-right">
                      {seller.paymentMethods.bankTransfer.bankName}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Account No.</span>
                    <span className="font-bold text-gray-900 font-mono text-right">
                      {seller.paymentMethods.bankTransfer.bankAccountNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Name</span>
                    <span className="font-bold text-gray-900 text-right">
                      {seller.paymentMethods.bankTransfer.accountHolderName}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* PayPal Details */}
            {seller.paymentMethods?.paypal && (
              <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-blue-800">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <FaPaypal className="text-xl" />
                  </div>
                  <h3 className="font-bold text-lg">PayPal</h3>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm mb-1">
                    PayPal Email
                  </span>
                  <span className="font-bold text-gray-900 break-all">
                    {seller.paymentMethods.paypal.paypalEmail}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Upload Proof */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-900">
              Upload Payment Screenshot
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-indigo-400 transition-all bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-contain rounded-2xl"
                  />
                ) : (
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
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
