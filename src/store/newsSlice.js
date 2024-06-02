
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCryptoNews = createAsyncThunk(
  'cryptoNews/fetchCryptoNews',
  async () => {
    const options = {
      method: 'GET',
      url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph',
      headers: {
        'X-RapidAPI-Key': '7f1df75ddemsh736f71dc9a45f8ep1741d9jsn3497c8999366',
        'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    return response.data;
  }
);
const cryptoNewsSlice = createSlice({
  name: 'cryptoNews',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchCryptoNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default cryptoNewsSlice.reducer;