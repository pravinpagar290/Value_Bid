import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader.jsx';

const UserProfile = () => {
  const { user, isAuthenticate, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticate) {
      navigate('/login');
    }
  }, [isAuthenticate, loading, navigate]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-white to-black h-32 md:h-48"></div>
          <div className="relative px-6 pb-8">
            <div className="relative -mt-16 mb-6 flex flex-col items-center md:block md:ml-6">
              <img
                src={user?.profileImage?.url}
                alt="Profile"
                className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-lg object-cover bg-white"
              />
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.username}
              </h1>
              <p className="text-gray-500 mb-8 flex items-center gap-2">
                <span className="capitalize px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-600">
                  {user?.role}
                </span>
                <span>Joined {user?.createdAt?.substring(0, 10)}</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                    Personal Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.username}
                        disabled
                        className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.email}
                        disabled
                        className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.role}
                        disabled
                        className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 capitalize"
                      />
                    </div>
                  </div>
                </div>

                {user?.role === 'seller' && (
                  <div>
                    <div className="mb-6">
                      <button
                        onClick={() => navigate('/my-auctions')}
                        className="w-full bg-black text-white py-3 px-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex justify-center items-center gap-2"
                      >
                        View My Auctions
                      </button>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                      Payment Details
                    </h2>
                    <div className="space-y-4">
                      {user?.paypalEmail && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Paypal Email
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.paypalEmail}
                            disabled
                            className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                          />
                        </div>
                      )}
                      {user?.bankName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.bankName}
                            disabled
                            className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                          />
                        </div>
                      )}
                      {user?.bankAccountNumber && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Bank Account Number
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.bankAccountNumber}
                            disabled
                            className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                          />
                        </div>
                      )}
                      {user?.accountHolderName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.accountHolderName}
                            disabled
                            className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
