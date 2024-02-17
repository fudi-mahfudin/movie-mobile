import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "@/theme";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const Navbar = ({ navigation, coverMode = false }: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <SafeAreaView
      className={`${
        coverMode && "absolute "
      }z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="rounded-xl p-1"
        style={styles.background}
      >
        <ChevronLeftIcon size="29" strokeWidth={2.5} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
        <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Navbar;

type Props = {
  navigation: any;
  coverMode?: boolean;
};
