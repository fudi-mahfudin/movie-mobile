import axios from "axios";

const baseUrl = process.env?.EXPO_PUBLIC_API_URL;
// Trending Movies
const trendingMoviesUrl = `${baseUrl}/trending/movie/day?language=en-US`;
const upcomingMoviesUrl = `${baseUrl}/movie/upcoming?language=en-US`;
const topRatedMoviesUrl = `${baseUrl}/movie/top_rated?language=en-US`;
const searchMoviesUrl = `${baseUrl}/search/movie?include_adult=false&language=en-US`;

// Dynamic url
const movieDetailsUrl = (id: number) => `${baseUrl}/movie/${id}?language=en-US`;
const movieCreditsUrl = (id: number) =>
  `${baseUrl}/movie/${id}/credits?language=en-US`;
const movieSimilarUrl = (id: number) =>
  `${baseUrl}/movie/${id}/similar?language=en-US`;
const personDetailsUrl = (id: number) =>
  `${baseUrl}/person/${id}?language=en-US`;
const personMoviesUrl = (id: number) =>
  `${baseUrl}/person/${id}/movie_credits?language=en-US`;

const apiCall = async (endpoint: string, params?: object) => {
  const options = {
    method: "GET",
    url: endpoint,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env?.EXPO_PUBLIC_API_TOKEN}`,
    },
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    return {};
  }
};

export const image500 = (path: string | null | undefined) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path: string | null | undefined) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path: string | null | undefined) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;
export const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesUrl);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesUrl);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesUrl);
};

export const fetchMovieDetails = (id: number) => {
  return apiCall(movieDetailsUrl(id));
};
export const fetchMovieCredits = (id: number) => {
  return apiCall(movieCreditsUrl(id));
};
export const fetchSimilarMovies = (id: number) => {
  return apiCall(movieSimilarUrl(id));
};
export const fetchPersonDetails = (id: number) => {
  return apiCall(personDetailsUrl(id));
};
export const fetchPersonMovies = (id: number) => {
  return apiCall(personMoviesUrl(id));
};
export const searchMovies = (params: SearchMoviesProps) => {
  return apiCall(searchMoviesUrl, params);
};

type SearchMoviesProps = {
  query: string;
  page: string;
};
