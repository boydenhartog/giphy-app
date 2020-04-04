import axios from "axios";

const BASE_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = process.env.VUE_APP_GIPHY_API_KEY;

async function search(query: string, limit = 9) {
  try {
    const res = await axios.get(
      `${BASE_URL}/search?q=${query}&api_key=${API_KEY}&limit=${limit}"`
    );

    return res.data;
  } catch (error) {
    return error;
  }
}

export default search;