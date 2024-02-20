import AppNavigation from "@/navigation/AppNavigation";
import HomeScreen from "@/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";

describe("AppNavigation", () => {
  test("render correctly", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const header = screen.getByText("Movies");
    const trendingTitle = await screen.findByText(
      "Trending",
      {},
      { timeout: 2000 }
    );
    const upcomingTitle = await screen.findByText("Upcoming");
    const upcomingMovies = await screen.findAllByTestId("upcoming-image");
    const topratedTitle = await screen.findByText("Top Rated");
    const topratedMovies = await screen.findAllByTestId("toprated-image");

    expect(header).toBeOnTheScreen();
    expect(trendingTitle).toBeOnTheScreen();
    expect(upcomingTitle).toBeOnTheScreen();
    expect(upcomingMovies).toHaveLength(20);
    expect(topratedTitle).toBeOnTheScreen();
    expect(topratedMovies).toHaveLength(20);
  });

  test("navigate to SearchScreen, Home > Search", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const searchButton = screen.getByTestId("search-button");

    const user = userEvent.setup();
    await user.press(searchButton);
    const newHeader = screen.getByPlaceholderText("Search Movie");
    const newExitButton = screen.getByTestId("search-exit-button");

    expect(newHeader).toBeOnTheScreen();
    expect(newExitButton).toBeOnTheScreen();
  });

  test("navigate to MovieScreen using Trending movie, Home > Movie", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const trendingMovies = await screen.findAllByTestId("trending-image");

    const user = userEvent.setup();
    await user.press(trendingMovies[0]);
    const newMovieTitle = await screen.findByTestId("movie-title");

    expect(newMovieTitle).toBeOnTheScreen();
  });

  test("navigate to MovieScreen using Upcoming movie, Home > Movie", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const upcomingMovies = await screen.findAllByTestId("upcoming-image");

    const user = userEvent.setup();
    await user.press(upcomingMovies[0]);
    const newMovieTitle = await screen.findByTestId("movie-title");

    expect(newMovieTitle).toBeOnTheScreen();
  });

  test("navigate to MovieScreen using Top Rated movie, Home > Movie", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const topratedMovies = await screen.findAllByTestId("toprated-image");

    const user = userEvent.setup();
    await user.press(topratedMovies[0]);
    const newMovieTitle = await screen.findByTestId("movie-title");

    expect(newMovieTitle).toBeOnTheScreen();
  });

  test("navigate to PersonScreen using Cast, Home > Movie > Person", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const user = userEvent.setup();
    const topratedMovies = await screen.findAllByTestId("toprated-image");
    await user.press(topratedMovies[0]);
    const casts = await screen.findAllByTestId("cast-image");
    await user.press(casts[0]);

    const newPersonName = await screen.findByTestId("person-name");
    expect(newPersonName).toBeOnTheScreen();
  });

  test("navigate to Person Movie, Home > Movie > Person > Movie", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const user = userEvent.setup();
    const topratedMovies = await screen.findAllByTestId("toprated-image");
    await user.press(topratedMovies[0]);
    const casts = await screen.findAllByTestId("cast-image");
    await user.press(casts[0]);

    const newPersonName = await screen.findByTestId("person-name");
    expect(newPersonName).toBeOnTheScreen();

    const personMovies = await screen.findAllByTestId("movies-image");
    await user.press(personMovies[0]);
    const finalMovieTitle = await screen.findByTestId("movie-title");

    expect(finalMovieTitle).toBeOnTheScreen();
  });

  test("navigate to Similar Movie, Home > Movie > Movie", async () => {
    const component = (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    render(component);
    const user = userEvent.setup();
    const topratedMovies = await screen.findAllByTestId("toprated-image");
    await user.press(topratedMovies[0]);
    const similarMovies = await screen.findAllByTestId("similarmovies-image");
    await user.press(similarMovies[0]);

    const newMovieTitle = await screen.findByTestId("movie-title");
    expect(newMovieTitle).toBeOnTheScreen();
  });
  // Navigation Movie > Person > Movie
  // Navigation Movie > Similar
});
