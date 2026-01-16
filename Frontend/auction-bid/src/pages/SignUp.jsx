import React from 'react';
import { register } from '../store/Slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-2.png';

const SignUp = () => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [paymentMethods, setPaymentMethod] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankACCNumber, setBankACCNumber] = useState('');
  const [holder, setHolder] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading, isAuthenticate } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formdata = new FormData();
    formdata.append('username', userName);
    formdata.append('password', password);
    formdata.append('email', email);
    formdata.append('role', role);
    if (profileImage) {
      formdata.append('profileImage', profileImage);
    }

    if (role === 'seller' && paymentMethods === 'banktransfer') {
      formdata.append('bankAccountNumber', bankACCNumber);
      formdata.append('bankName', bankName);
      formdata.append('accountHolderName', holder);
    }

    if (role === 'seller' && paymentMethods === 'paypal') {
      formdata.append('paypalEmail', paypalEmail);
    }
    dispatch(register(formdata));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  useEffect(() => {
    if (role !== 'seller') {
      setPaymentMethod('');
      setBankName('');
      setBankACCNumber('');
      setHolder('');
      setPaypalEmail('');
    }
  }, [role]);

  useEffect(() => {
    if (isAuthenticate) {
      navigateTo('/');
    }
  }, [dispatch, loading, isAuthenticate]);

  const validateForm = () => {
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }

    if (!role) {
      toast.error('Please select a role');
      return false;
    }

    if (role === 'seller' && !paymentMethods) {
      toast.error('Please select a payment method');
      return false;
    }

    if (role === 'seller' && paymentMethods === 'banktransfer') {
      if (!bankName || !bankACCNumber || !holder) {
        toast.error('Please fill all bank details');
        return false;
      }
    }

    if (role === 'seller' && paymentMethods === 'paypal' && !paypalEmail) {
      toast.error('PayPal email is required');
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center">
          <img src={logo} alt="ValueBid Logo" className="h-16 w-auto mb-4" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our auction community today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Full Name"
                name="name"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                {profileImagePreview && (
                  <img
                    src={profileImagePreview}
                    alt="Preview"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <input
                  type="file"
                  onChange={imageHandler}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="bidder">Become Bidder (Buy Items)</option>
                <option value="seller">Become Seller (List Items)</option>
              </select>
            </div>

            {role === 'seller' && (
              <div className="sm:col-span-2 space-y-4 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Seller Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    id="paymentMethods"
                    value={paymentMethods}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Your Payment Method</option>
                    <option value="banktransfer">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {paymentMethods === 'banktransfer' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={bankName}
                      placeholder="Bank Name"
                      required
                      onChange={(e) => setBankName(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      value={holder}
                      placeholder="Account Holder Name"
                      required
                      onChange={(e) => setHolder(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      value={bankACCNumber}
                      placeholder="Bank Account Number"
                      required
                      onChange={(e) => setBankACCNumber(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
                {paymentMethods === 'paypal' && (
                  <div>
                    <input
                      type="email"
                      name="paypalEmail"
                      value={paypalEmail}
                      placeholder="PayPal Email Address"
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
