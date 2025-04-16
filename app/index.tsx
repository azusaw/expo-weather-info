import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { getCurrentWeatherByCoords } from "@/libs/getCurrentWeatherByCoords";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import { getWeeklyWeatherByCoords } from "@/libs/getWeeklyWeatherByCoords";
import { Coords, CurrentWeather, DailyWeather } from "@/types";
import { View } from "@/components/Themed";
import CurrentWeatherView from "@/components/CurrentWeatherView";
import WeeklyWeatherView from "@/components/WeeklyWeatherView";
import BouncingDots from "@/components/BouncingDots";
import { useLocationStore } from "@/store/useLocationStore";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get("window");

const Home = () => {
  const location = useLocationStore((state) => state.location);
  const { setLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [weeklyWeather, setWeeklyWeather] = useState<DailyWeather[]>();

  const setCurrentLocation = async () => {
    await getCurrentCoords().then((data) =>
      setLocation({ name: "Your Location", coords: data }),
    );
  };

  const refreshWeather = async (coords: Coords) => {
    setIsLoading(true);
    await Promise.all([
      getCurrentWeatherByCoords(coords).then((data) => setCurrentWeather(data)),
      getWeeklyWeatherByCoords(coords).then((data) => setWeeklyWeather(data)),
    ]).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  useEffect(() => {
    location && refreshWeather(location.coords);
  }, [location]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(isLoading ? 10 : 0, {
          stiffness: 100,
          damping: 40,
        }),
      },
    ],
    opacity: withSpring(isLoading ? 0 : 1),
  }));

  return (
    <View style={styles.container}>
      {isLoading ? (
        <BouncingDots />
      ) : (
        <Animated.View style={animatedStyle}>
          {currentWeather && (
            <CurrentWeatherView
              siteName={location?.name}
              data={currentWeather}
            />
          )}
          {weeklyWeather && <WeeklyWeatherView data={weeklyWeather} />}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: width,
    overflowX: "hidden",
    overflowY: "scroll",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    paddingBottom: 40, // for menu button
  },
});
export default Home;
