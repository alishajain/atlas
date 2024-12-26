import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { logout } from "../Redux/userSlice"; // Import logout action to clear userId from Redux

const Home = () => {
  const navigate = useNavigate(); // Hook to navigate between different paths
  const dispatch = useDispatch(); // Dispatch for logging out

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to reset userId in Redux
    navigate("/login"); // Navigate to login page after logging out
  };

  return (
    <div>
      {/* Logout button on top */}
      <button onClick={handleLogout}>Log Out</button>

      <h1>Welcome to the Home Page</h1>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* Image buttons that navigate to different paths */}
        <img
          src="https://via.placeholder.com/150" // Replace with actual image URL
          alt="Page 1"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/page1")}
        />
        <img
          src="https://via.placeholder.com/150" // Replace with actual image URL
          alt="Page 2"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/page2")}
        />
        <img
          src="https://via.placeholder.com/150" // Replace with actual image URL
          alt="Page 3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/page3")}
        />
      </div>
    </div>
  );
};

export default Home;
