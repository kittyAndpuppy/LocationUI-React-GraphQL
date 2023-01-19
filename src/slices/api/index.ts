import axios from "axios";
import { toast } from "react-toastify";
import { ILocation, DetailType } from "../../global/types";

import {
  allLocations,
  filterHome,
  filterOffice,
  filterActive,
  getCurrent,
  createLocation,
  deleteLocation,
  updateLocation,
} from "../../graphql";

const API = axios.create({ baseURL: "http://localhost:4000/" });

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    toast("Error", { type: "error" });
    throw err.response.data;
  }
);

export const getAllLocations = (page: number, perPage: number) =>
  API.post(`/`, { query: `query {${allLocations(page, perPage)}}` });

export const getCurrentLocation = (index: string) =>
  API.post(`/`, { query: `query {${getCurrent(index)}}` });

export const filterByHome = () =>
  API.post(`/`, { query: `query {${filterHome("home")}}` });

export const filterByOffice = () =>
  API.post(`/`, { query: `query {${filterOffice("office")}}` });

export const filterByActive = () =>
  API.post(`/`, { query: `query {${filterActive("Active")}}` });

export const filterByOff = () =>
  API.post(`/`, { query: `query {${filterActive("Off")}}` });

export const create = (data: ILocation) =>
  API.post(`/`, { query: `mutation {${createLocation(data)}}` });

export const updateCurrent = (id: string, data: DetailType) =>
  API.post(`/`, { query: `mutation {${updateLocation(id, data)}}` });
export const deleteCurrent = (id: string) =>
  API.post(`/`, { query: `mutation {${deleteLocation(id)}}` });
