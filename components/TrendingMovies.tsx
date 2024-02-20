import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { MovieNavigationProps } from "@/navigation/AppNavigation";
import { fallbackImage, image500 } from "@/api/moviedb";
import { MovieIndexProps } from "@/interfaces/MovieList";

const { width, height } = Dimensions.get("window");

type Props = {
  data: MovieIndexProps[];
};

const TrendingMovies = ({ data }: Props) => {
  const navigation = useNavigation<MovieNavigationProps>();
  const handleClick = (item: any) => {
    navigation.navigate("Movie", { movieId: item.id });
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

type MovieCardProps = {
  item: MovieIndexProps;
  handleClick: () => void;
};

const MovieCard = ({ item, handleClick }: MovieCardProps) => (
  <TouchableWithoutFeedback onPress={handleClick}>
    <Image
      source={{ uri: image500(item.poster_path) || fallbackImage }}
      style={{ width: width * 0.6, height: height * 0.4 }}
      className="rounded-3xl"
      accessibilityRole="image"
      testID="trending-image"
    />
  </TouchableWithoutFeedback>
);

export default TrendingMovies;
