import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { MovieNavigationProps } from "@/navigation/AppNavigation";
import { fallbackImage, image185 } from "@/api/moviedb";
import { MovieIndexProps } from "@/interfaces/MovieList";
import { PersonMovieProps } from "@/interfaces/Person";

const { width, height } = Dimensions.get("window");

type Props = {
  title: string;
  data: MovieIndexProps[] | PersonMovieProps[];
  hideSeeAll?: boolean;
};

const MovieList = ({ title, data, hideSeeAll }: Props) => {
  const navigation = useNavigation<MovieNavigationProps>();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.navigate("Movie", { movieId: item.id })}
          >
            <View className="space-y-1 mr-4">
              <Image
                source={{ uri: image185(item.poster_path) || fallbackImage }}
                className="rounded-3xl"
                style={{ width: width * 0.33, height: height * 0.22 }}
                testID={`${title.replaceAll(" ", "").toLowerCase()}-image`}
              />
              <Text className="text-neutral-300 ml-1">
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
