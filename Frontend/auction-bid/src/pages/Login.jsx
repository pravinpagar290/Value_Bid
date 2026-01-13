import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/Slices/userSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticate } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { email, password };
    dispatch(login(form));
  };

  useEffect(() => {
    if (isAuthenticate) {
      navigate('/');
    }
  }, [dispatch, isAuthenticate, loading]);

  return (
    <div>
      <div>Logo</div>
      <h1>Welcome Back </h1>
      <span>Sign in to continue bidding</span>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{loading ? 'Logging In...' : 'Login'}</button>
        <p>
          Don't have an account? <Link to={'/signup'}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
