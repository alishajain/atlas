import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setUserId } from '../Redux/userSlice'; // Import setUserId action

const SignIn = () => {
  const [userId, setUserIdState] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate after login

  const handleInputChange = (e) => {
    setUserIdState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      dispatch(setUserId(userId)); // Dispatch action to store userId in Redux
      navigate('/home'); // Navigate to Home page after successful login
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={handleInputChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
