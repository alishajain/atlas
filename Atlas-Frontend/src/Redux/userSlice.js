import { createSlice } from '@reduxjs/toolkit';

// Create the user slice of the state
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '', // Initial state for the userId
  },
  reducers: {
    // Action to set userId
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // Action to clear userId (for logout functionality)
    logout: (state) => {
      state.userId = ''; // Clear the userId on logout
    },
  },
});

// Export the action creators
export const { setUserId, logout } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
