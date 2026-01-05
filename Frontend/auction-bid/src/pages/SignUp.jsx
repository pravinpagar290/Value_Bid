import React from 'react';
import { register } from '../store/Slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
  if (role !== "seller") {
    setPaymentMethod("");
    setBankName("");
    setBankACCNumber("");
    setHolder("");
    setPaypalEmail("");
  }
}, [role]);

  return (
    <div className="">
      <div className="logo"></div>
      <h1>Create A Account</h1>
      <p>Join our auction community</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Full Name"
          name="name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          name="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          name="password"
          required
        />
        <div className="flex flex-col sm:flex-1 gap-2">
          <label className="text-[16px] text-stone-600">Profile Image</label>
          <input type="file" onChange={imageHandler} />
        </div>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="bidder">Become Bidder</option>
          <option value="seller">Become Seller</option>
        </select>
        {role === 'seller' ? (
          <div>
            <select
              name="paymentMethod"
              id="paymentMethods"
              value={paymentMethods}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Your Payment Method</option>
              <option value="banktransfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
            {paymentMethods === 'banktransfer' && (
              <div>
                <input
                  type="text"
                  value={bankName}
                  placeholder="Enter Your Bank Name"
                  required
                  onChange={(e) => setBankName(e.target.value)}
                />
                <input
                  type="text"
                  value={holder}
                  placeholder="Enter Your Bank Account Name"
                  required
                  onChange={(e) => setHolder(e.target.value)}
                />
                <input
                  type="number"
                  value={bankACCNumber}
                  placeholder="Enter Your Bank Account Number"
                  required
                  onChange={(e) => setBankACCNumber(e.target.value)}
                />
              </div>
            )}
            {paymentMethods === 'paypal' && (
              <div>
                <input
                  type="email"
                  name="paypalEmail"
                  value={paypalEmail}
                  placeholder="Enter PayPal Email"
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
