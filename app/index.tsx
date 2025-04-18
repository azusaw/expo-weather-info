import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import useSWR from "swr";
import { LinearGradient } from "expo-linear-gradient";
import { getCurrentWeatherByCoords } from "@/libs/getCurrentWeatherByCoords";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import { getWeeklyWeatherByCoords } from "@/libs/getWeeklyWeatherByCoords";
import { Coords } from "@/types";
import CurrentWeatherView from "@/components/CurrentWeatherView";
import WeeklyWeatherView from "@/components/WeeklyWeatherView";
import BouncingDots from "@/components/BouncingDots";
import { useLocationStore } from "@/store/useLocationStore";
import { View } from "@/components/Themed";
import { useScreenSizeContext } from "@/components/ScreenSizeProvider";

const weatherFetcher = async (coords?: Coords) => {
  if (coords) {
    const [currentWeather, weeklyWeather] = await Promise.all([
      getCurrentWeatherByCoords(coords),
      getWeeklyWeatherByCoords(coords),
    ]);
    return { currentWeather, weeklyWeather };
  }
};

const Home = () => {
  const { width, isSmall } = useScreenSizeContext();
  const location = useLocationStore((state) => state.location);
  const { setLocation } = useLocationStore();

  useEffect(() => {
    const setCurrentLocation = async () => {
      await getCurrentCoords().then((data) =>
        setLocation({ name: "Your Location", coords: data }),
      );
    };
    setCurrentLocation();
  }, []);

  const {
    data: { currentWeather, weeklyWeather } = {},
    isLoading,
    error, //TODO: add error handling if it needed
  } = useSWR(location?.coords ?? null, () => weatherFetcher(location?.coords), {
    revalidateOnFocus: false, // for keeping cache
    dedupingInterval: 600000, // cache data for 10 minutes
  });

  const currentWeatherAnimatedStyle = useAnimatedStyle(() => ({
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
    <LinearGradient
      colors={[
        "rgb(131, 220, 169)",
        "rgb(124, 191, 195)",
        "rgb(117, 164, 221)",
      ]}
      start={{ x: 0.4, y: 0 }}
      end={{ x: 0.4, y: 1 }}
      style={styles.container}
    >
      <>
        {isLoading ? (
          <View style={styles.content}>
            <BouncingDots />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={[
              styles.content,
              isSmall && styles.contentSmall,
              { maxWidth: width },
            ]}
          >
            <Animated.View style={currentWeatherAnimatedStyle}>
              {currentWeather && (
                <CurrentWeatherView
                  siteName={location?.name}
                  data={currentWeather}
                />
              )}
              {weeklyWeather && <WeeklyWeatherView data={weeklyWeather} />}
            </Animated.View>
          </ScrollView>
        )}
      </>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40, // for menu button
  },
  contentSmall: {
    paddingTop: 20,
  },
});
export default Home;
