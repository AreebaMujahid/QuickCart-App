import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "", // Initial role is empty, which will be set on signup
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    // Action to set the role to Admin
    setAdmin: (state) => {
      state.role = "Admin";
    },
    // Action to set the role to Merchant
    setMerchant: (state) => {
      state.role = "merchant";
    },
    // Action to set the role to User
    setUser: (state) => {
      state.role = "user";
    },
    // General action to set a specific role based on payload
    setRole: (state, action) => {
      state.role = action.payload; // Sets role dynamically
    },
  },
});

// Export specific action creators for setting roles
export const { setAdmin, setMerchant, setUser, setRole } = roleSlice.actions;

// Export the selector to access the role in components
export const selectRole = (state) => state.role.role;

// Export the reducer for store configuration
export default roleSlice.reducer;
