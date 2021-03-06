
export interface SearchResponse {
  data: Array<GiphyResult>;
  pagination: Pagination;
  meta: Meta;
}

export interface SearchProps {
  query: string;
  limit: number;
  offset: number;
}

export interface GiphyResult {
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
  images: {
    original: {
      height: string;
      width: string;
      url: string;
    };
  };
  analytics_response_payload: string;
  analytics: object;
}

export interface Pagination {
  total_count: number;
  count?: number;
  offset?: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}


