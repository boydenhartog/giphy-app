import axios from "axios";

const BASE_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = process.env.VUE_APP_GIPHY_API_KEY;

export interface SearchResponse {
  data: Array<DataResult>;
  pagination: Pagination;
  meta: Meta;
}

export interface DataResult {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: object;
  analytics_response_payload: string;
  analytics: object;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

interface SearchProps {
  query: string,
  limit: number,
  offset: number
}

async function search({ query, limit = 6, offset = 0 }: SearchProps): Promise<SearchResponse> {
  try {
    const res = await axios.get(
      `${BASE_URL}/search?q=${query}&api_key=${API_KEY}&limit=${limit}&offset=${offset}"`
    );

    return res.data;
  } catch (error) {
    return error;
  }
}

export default search;
