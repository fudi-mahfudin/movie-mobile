import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "@/components/Cast";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import {
  fallbackImage,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "@/api/moviedb";
import { MovieDetailsProps } from "@/interfaces/MovieDetails";
import { CastProps } from "@/interfaces/MovieCredits";
import { RootStackParamList } from "@/navigation/AppNavigation";
import { MovieIndexProps } from "@/interfaces/MovieList";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "Movie">>();
  const navigation = useNavigation();
  const [cast, setCast] = useState<CastProps[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MovieIndexProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(params.movieId);
    getMovieCredits(params.movieId);
    getSimilarMovies(params.movieId);
  }, [params]);

  const getMovieDetails = async (id: number) => {
    try {
      const data = await fetchMovieDetails(id);
      if (data) setMovie(data);
    } catch (err) {
      console.log("Error", { err });
    } finally {
      setLoading(false);
    }
  };

  const getMovieCredits = async (id: number) => {
    try {
      const data = await fetchMovieCredits(id);
      if (data && data.cast) setCast(data.cast);
    } catch (err) {
      console.log("Error", { err });
    } finally {
      setLoading(false);
    }
  };

  const getSimilarMovies = async (id: number) => {
    try {
      const data = await fetchSimilarMovies(id);
      if (data && data.results) setSimilarMovies(data.results);
    } catch (err) {
      console.log("Error", { err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <Navbar navigation={navigation} coverMode={true} />
      {loading || !movie ? (
        <Loading />
      ) : (
        <>
          <View className="w-full">
            <View>
              <Image
                source={{ uri: image500(movie?.poster_path) || fallbackImage }}
                style={{ width, height: height * 0.55 }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          </View>

          {/* Movie details */}
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text
              className="text-white text-center text-3xl font-bold tracking-wider"
              testID="movie-title"
            >
              {movie?.title}
            </Text>
            {/* status, release, runtime */}
            {movie?.id ? (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
                {movie?.runtime} min
              </Text>
            ) : null}
            {/* genres */}
            <View className="flex-row justify-center mx-4 space-x-2">
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.genres?.map((genre) => genre.name).join(" • ")}
              </Text>
            </View>
            {/* description */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {movie?.overview}
            </Text>
          </View>

          {/* Cast */}
          {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

          {/* Similar movies */}
          {similarMovies.length > 0 && (
            <MovieList
              title="Similar Movies"
              hideSeeAll={true}
              data={similarMovies}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default MovieScreen;
