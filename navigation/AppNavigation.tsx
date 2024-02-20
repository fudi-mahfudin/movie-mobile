import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import MovieScreen from "@/screens/MovieScreen";
import PersonScreen from "@/screens/PersonScreen";
import SearchScreen from "@/screens/SearchScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Movie"
        options={{ headerShown: false }}
        component={MovieScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonScreen}
      />
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;

export type RootStackParamList = {
  Home: undefined;
  Movie: { movieId: number };
  Person: { personId: number };
  Search: undefined;
};

export type MovieNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;
