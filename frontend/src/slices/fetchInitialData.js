import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { apiRoutes } from '../routes';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (authHeader, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(apiRoutes.usersPath(), {
        headers: authHeader,
      });
      return data;
    } catch (error) {
      if (error.isAxiosError) {
        return rejectWithValue(error.response.status);
      }

      throw error;
    }
  },
);
export default fetchInitialData;
