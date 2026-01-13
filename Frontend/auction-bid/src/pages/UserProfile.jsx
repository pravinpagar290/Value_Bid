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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <img src={user?.profileImage?.url} alt="Profile" className="" />
          <div>
            <h1>Personal Details</h1>
            <div>
              <label>Username</label>
              <input type="text" defaultValue={user?.username} disabled />
            </div>
            <div>
              <label>Email</label>
              <input type="text" defaultValue={user?.email} disabled />
            </div>
            <div>
              <label>Role</label>
              <input type="text" defaultValue={user?.role} disabled />
            </div>
            <div>
              <label>Joined On</label>
              <input
                type="text"
                defaultValue={user?.createdAt?.substring(0, 10)}
                disabled
              />
            </div>
          </div>
          {user?.role === 'seller' && (
            <div>
              <h1>Payment Details</h1>
              <div>
                {user?.paypalEmail && (
                  <div>
                    <label>Paypal Email</label>
                    <input
                      type="text"
                      defaultValue={user?.paypalEmail}
                      disabled
                    />
                  </div>
                )}
                {user?.bankName && (
                  <div>
                    <label>Bank Name</label>
                    <input type="text" defaultValue={user?.bankName} disabled />
                  </div>
                )}
                {user?.bankAccountNumber && (
                  <div>
                    <label>Bank Account Number</label>
                    <input
                      type="text"
                      defaultValue={user?.bankAccountNumber}
                      disabled
                    />
                  </div>
                )}
                {user?.accountHolderName && (
                  <div>
                    <label>Account Holder Name</label>
                    <input
                      type="text"
                      defaultValue={user?.accountHolderName}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
