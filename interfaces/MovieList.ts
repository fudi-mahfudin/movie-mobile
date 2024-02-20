export interface TrendingProps {
  page: number;
  results: MovieIndexProps[];
  total_pages: number;
  total_results: number;
}

export interface TopRatedProps {
  page: number;
  results: MovieIndexProps[];
  total_pages: number;
  total_results: number;
}

export interface UpcomingProps {
  dates: Dates;
  page: number;
  results: MovieIndexProps[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface SimilarMoviesProps {
  page: number;
  results: MovieIndexProps[];
  total_pages: number;
  total_results: number;
}

export interface SearchMoviesProps {
  page: number;
  results: MovieIndexProps[];
  total_pages: number;
  total_results: number;
}

export interface MovieIndexProps {
  adult: boolean;
  backdrop_path?: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  media_type?: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
