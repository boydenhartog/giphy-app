import axios from "axios";
import moment from "moment";
import { SearchProps, SearchResponse } from "./giphyApiTypes";

const { VUE_APP_GIPHY_BASE_URL, VUE_APP_GIPHY_API_KEY } = process.env;
export const VALID_FOR = 3;

export function isValid(dateTime: string) {
  const now = moment();
  const validTo = moment(dateTime);

  return validTo.diff(now) > 0;
}

export function getCachedOrInvalidate(url: string) {
  const cachedDataValidTill = localStorage.getItem(`${url}-validTill`);
  
  if (cachedDataValidTill && isValid(cachedDataValidTill)) {
    const cachedData = localStorage.getItem(url);
    if (cachedData) return JSON.parse(cachedData);
  }

  localStorage.removeItem(url);
  localStorage.removeItem(`${url}-validTill`);
 
  return null;
}

export function cacheRequest(url: string, res: SearchResponse) {
  // Ran into some giphy responses that are too large to store in local storage.
  // For production would look at other caching solution (localforage)
  try {
    localStorage.setItem(url, JSON.stringify(res));
    localStorage.setItem(
      `${url}-validTill`,
      moment()
        .add(VALID_FOR, "minutes")
        .format()
    );  
  } catch (error) {
    // console.log("Request too large to cache.")
    return error;
  }
}

export async function searchGifs({
  query,
  limit = 12,
  offset = 0,
}: SearchProps): Promise<SearchResponse> {
  const url = `${VUE_APP_GIPHY_BASE_URL}/gifs/search?q=${query}&api_key=${VUE_APP_GIPHY_API_KEY}&limit=${limit}&offset=${offset}"`;
  const cached = getCachedOrInvalidate(url);
  if (cached) return cached;

  const res = await axios.get(url);
  cacheRequest(url, res.data);

  return res.data;
}

