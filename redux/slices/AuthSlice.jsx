import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';

let initialState = {
  isLoggedIn: false,
  data: {},
};



export const createAccount = createAsyncThunk(
  'auth/signup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}Signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return result;
    } catch (error) {
    //   toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const loginAccount = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
   
      return result;
    } catch (error) {
    //   toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.data = {};
      if (typeof window !== 'undefined') {
        localStorage.removeItem("userProfileData");
        localStorage.setItem("isLoggedIn", "false");
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.fulfilled, (state, action) => {
        const userData = action.payload?.result || {};

        if (typeof window !== 'undefined') {
          localStorage.setItem("userProfileData", JSON.stringify(userData));
          localStorage.setItem("isLoggedIn", "true");
        }

        state.isLoggedIn = true;
        state.data = userData;
      })
      .addCase(loginAccount.rejected, (state) => {
        state.isLoggedIn = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
