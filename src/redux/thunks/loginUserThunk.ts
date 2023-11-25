// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { apiCall } from './apiCallThunk';
// import { API_ENDPOINTS } from '../../api/urlEndpoints/authEnpoint';

// export const loginUser = createAsyncThunk('auth/login', async (requestData, { dispatch, rejectWithValue }) => {
//   try {
//     const response = await apiCall({ url: `${API_ENDPOINTS.USER_LOGIN}`, method: 'GET', data: requestData });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });