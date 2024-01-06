import { createSlice } from '@reduxjs/toolkit';
import { User } from 'context/auth-context';

const initialState = {
  user: {
    user_id: '',
    user_email: '',
    user_fullname: '',
    user_role: '1',
    user_stream_key: '',
    username: '',
    user_avatar: '',
    user_wallet_address: ''
  } as User,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      state.user = { ...action.payload }
    },
  },
});

export const { storeUserData } = userSlice.actions;

export default userSlice.reducer;
