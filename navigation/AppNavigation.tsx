import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default AppNavigation;

type RootStackParamList = {
  Home: undefined;
  Movie: { item: number } | undefined;
  Person: undefined;
  Search: undefined;
};

export type MovieNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;
