import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "@/theme";
import TrendingMovies from "@/components/TrendingMovies";
import MovieList from "@/components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "@/components/Loading";
import { MovieNavigationProps } from "@/navigation/AppNavigation";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "@/api/moviedb";
import { MovieIndexProps } from "@/interfaces/MovieList";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
  const [trending, setTrending] = useState<MovieIndexProps[]>([]);
  const [upcoming, setUpcoming] = useState<MovieIndexProps[]>([]);
  const [topRated, setTopRated] = useState<MovieIndexProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<MovieNavigationProps>();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    try {
      const data = await fetchTrendingMovies();
      if (data && data.results) setTrending(data.results);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };
  const getUpcomingMovies = async () => {
    try {
      const data = await fetchUpcomingMovies();
      if (data && data.results) setUpcoming(data.results);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };
  const getTopRatedMovies = async () => {
    try {
      const data = await fetchTopRatedMovies();
      if (data && data.results) setTopRated(data.results);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and log */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            {" "}
            <Text style={styles.text}>M</Text>ovies{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            testID="search-button"
          >
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movie corousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* Upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />
          {/* Top rated movies row */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
