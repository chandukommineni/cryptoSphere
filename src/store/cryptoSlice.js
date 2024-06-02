
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'f1c33b4a14msh2dd12af9bfe7851p186535jsn50ecc0d2e234',
};

const createRequest = (url) => ({
  method: 'GET',
  url: `https://coinranking1.p.rapidapi.com${url}`,
  
  headers: cryptoApiHeaders,
});
export const fetchCryptoCoins = createAsyncThunk('crypto/fetchCryptoCoins', async () => {
  const response = await axios(createRequest(`/coins`));
  return response.data;
});
export const fetchCryptosLimit = createAsyncThunk('crypto/fetchCryptos', async (count) => {
  const response = await axios(createRequest(`/coins?limit=${count}`));
  return response.data;
});

export const fetchCryptoDetails = createAsyncThunk('crypto/fetchCryptoDetails', async (coinId) => {
  const response = await axios(createRequest(`/coin/${coinId}`));
  return response.data;
});

export const fetchCryptoHistory = createAsyncThunk('crypto/fetchCryptoHistory', async ({ coinId, timePeriod }) => {
  const response = await axios(createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`));
  return response.data;
});

export const fetchExchanges = createAsyncThunk('crypto/fetchExchanges', async () => {
  const response = await axios(createRequest('/exchanges'));
  return response.data;
});


const initialState = {
    coins:[],
    limitedCryptos: [],
    cryptoDetails: {},
    cryptoHistory: {},
    exchanges: [],
    status: 'idle',
    error: null,
  };
  
  const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCryptosLimit.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCryptosLimit.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.limitedCryptos = action.payload.data;
        })
        .addCase(fetchCryptosLimit.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
          state.cryptoDetails = action.payload;
        })
        .addCase(fetchCryptoHistory.fulfilled, (state, action) => {
          state.cryptoHistory = action.payload;
        })
        .addCase(fetchExchanges.fulfilled, (state, action) => {
          state.exchanges = action.payload;
        })
        .addCase(fetchCryptoCoins.fulfilled, (state, action) => {
        
          state.coins=  action.payload.data;
        });
    },
  });
  
  export default cryptoSlice.reducer;