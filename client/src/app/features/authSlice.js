import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: true,
    aiCredits: 2,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.aiCredits = action.payload.user.aiCredits;
    },
    logout: (state) => {
      (state.token = ""), (state.user = null), (state.aiCredits = 2);
      localStorage.removeItem("token");
      localStorage.removeItem("aiCredits");
      sessionStorage.removeItem("aiCredits");
      sessionStorage.clear();
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    decrementCredits: (state) => {
      if (state.aiCredits > 0) state.aiCredits -= 1;
    },
    updateCredits: (state, action) => {
      state.aiCredits = action.payload;
    },
  },
});

export const { login, logout, setLoading, decrementCredits, updateCredits } = authSlice.actions;

export default authSlice.reducer;