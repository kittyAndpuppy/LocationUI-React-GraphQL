import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "./api";
import { ILocation, PageForm, DetailType } from "../global/types";
import { RootState } from "../store";


const initialState = {
  locations: [] as ILocation[],
  pages: [] as ILocation[],
  current: {} as ILocation | undefined,
};

export const getLocations = createAsyncThunk(
  "location/locations",
  async (pageForm: PageForm) => {
    const res = await api.getAllLocations(pageForm.page, pageForm.perPage);
    return res.data.data.allLocations;
  }
);

export const filterByHome = createAsyncThunk("location/home", async () => {
  const res = await api.filterByHome();
  return res.data.data.allLocations;
});

export const filterByOffice = createAsyncThunk("location/office", async () => {
  const res = await api.filterByOffice();
  return res.data.data.allLocations;
});

export const filterByActive = createAsyncThunk("location/active", async () => {
  const res = await api.filterByActive();
  return res.data.data.allLocations;
});

export const filterByOff = createAsyncThunk("location/off", async () => {
  const res = await api.filterByOff();
  return res.data.data.allLocations;
});

export const getPages = createAsyncThunk("location/pages", async () => {
  const res = await api.getAllLocations(0, 0);
  return res.data.data.allLocations;
});

export const getCurrentLocation = createAsyncThunk(
  "location/current",
  async (id: string) => {
    const res = await api.getCurrentLocation(id);
    return res.data.data.Location;
  }
);

export const createLocation = createAsyncThunk(
  "location/create",
  async (data: ILocation) => {
    const res = await api.create(data);
    return res.data.data.createLocation;
  }
);

export const updateLocation = createAsyncThunk(
  "location/update",
  async ([id, data]: [string, DetailType]) => {
    const res = await api.updateCurrent(id, data);
    return res.data.data.updateLocation;
  }
);

export const deleteLocation = createAsyncThunk(
  "location/delete",
  async (id: string) => {
    await api.deleteCurrent(id);
    return id;
  }
);

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(getPages.fulfilled, (state, action) => {
        state.pages = action.payload;
      })
      .addCase(filterByHome.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(filterByOffice.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(filterByActive.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(filterByOff.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        const data = action.payload;
        state?.locations.push(data);
        state?.pages.push(data);
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.locations = state.locations.map((item) => {
          if (action.payload.id === item.id) {
            return {
              ...item,
              ...action.payload,
            };
          } else return item;
        });
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter(
          (item) => item.id !== action.payload
        );
        state.current = undefined
      });
  },
});

export const selectLocations = (state: RootState) => state.location.locations;
export const selectPages = (state: RootState) => state.location.pages;
export const selectCurrent = (state: RootState) => state.location.current;
const { reducer } = locationSlice;
export default reducer;
