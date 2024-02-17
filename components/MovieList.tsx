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

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }: Props) => {
  const movieName = "Glass Onion: A Knives Out Mystery";
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
            onPress={() => navigation.navigate("Movie", { item })}
          >
            <View className="space-y-1 mr-4">
              <Image
                source={require("@/assets/images/moviePoster1.jpg")}
                className="rounded-3xl"
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className="text-neutral-300 ml-1">
                {movieName.length > 14
                  ? movieName.slice(0, 14) + "..."
                  : movieName}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;

type Props = {
  title: string;
  data: number[];
  hideSeeAll?: boolean;
};
