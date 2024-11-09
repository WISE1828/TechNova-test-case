import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IWeather, IWeatherState } from "../types/types";

const initialState: IWeatherState = {
  list: [],
  status: 'idle',
  error: null,
}

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f5f586b21407152d55eefcf50ff1cb9e';

export const fetchWeatherData = createAsyncThunk('weather/fetchWeatherData', async (city: string) => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      q: city,
      lang: 'ru',
      units: 'metric',
      appid: API_KEY,
    },
  });
  return response.data;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeather: (state, action: PayloadAction<IWeather>) => {
      state.list.push(action.payload);
    },
    deleteWeather: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(weather => weather.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.status = 'resolved';
    });
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || null;
    });
    
  },
});

export const { addWeather, deleteWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
