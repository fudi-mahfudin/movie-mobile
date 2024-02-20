import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import Loading from "@/components/Loading";
import {
  fallbackImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "@/api/moviedb";
import { RootStackParamList } from "@/navigation/AppNavigation";
import { PersonMovieProps, PersonProps } from "@/interfaces/Person";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const PersonScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "Person">>();
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState<PersonMovieProps[]>([]);
  const [person, setPerson] = useState<PersonProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(params.personId);
    getPersonMovies(params.personId);
  }, [params]);

  const getPersonDetails = async (id: number) => {
    try {
      const data = await fetchPersonDetails(id);
      if (data) setPerson(data);
    } catch (err) {
      console.log("Error", { err });
    } finally {
      setLoading(false);
    }
  };
  const getPersonMovies = async (id: number) => {
    try {
      const data = await fetchPersonMovies(id);
      if (data && data.cast) setPersonMovies(data.cast);
    } catch (err) {
      console.log("Error", { err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Navbar navigation={navigation} />

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={{
                  uri: image342(person?.profile_path) || fallbackImage,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text
              className="text-3xl text-white font-bold text-center"
              testID="person-name"
            >
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || "N/A"}
            </Text>
          </View>

          {/* Movies */}
          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
