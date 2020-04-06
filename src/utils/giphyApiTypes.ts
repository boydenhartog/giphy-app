export interface SearchResponse {
  data: Array<DataResult>;
  pagination: Pagination;
  meta: Meta;
}

export interface SearchProps {
  query: string;
  limit: number;
  offset: number;
}

interface DataResult {
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

interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

interface Meta {
  status: number;
  msg: string;
  response_id: string;
}


