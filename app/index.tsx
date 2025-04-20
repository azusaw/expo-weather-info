import React, { useState } from "react";
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
import { useLocationStore } from "@/store/useLocationStore";
import { useScreenSizeContext } from "@/components/ScreenSizeProvider";
import CurrentWeatherView from "@/components/CurrentWeatherView";
import WeeklyWeatherView from "@/components/WeeklyWeatherView";
import BouncingDots from "@/components/BouncingDots";
import { View } from "@/components/Themed";
import ErrorContent from "@/components/ErrorContent";

const weatherFetcher = async (coords?: Coords) => {
  if (coords) {
    const [currentWeather, weeklyWeather] = await Promise.all([
      getCurrentWeatherByCoords(coords),
      getWeeklyWeatherByCoords(coords),
    ]);
    return { currentWeather, weeklyWeather };
  }
};

enum ErrorType {
  GEOLOCATION = "GEOLOCATION",
  WEATHER = "WEATHER",
}

const Index = () => {
  const [errorType, setErrorType] = useState<ErrorType | undefined>();
  const { width, isSmall } = useScreenSizeContext();
  const location = useLocationStore((state) => state.location);
  const { setLocation } = useLocationStore();

  const { mutate: mutateLocation } = useSWR(
    "currentLocation",
    () => getCurrentCoords(),
    {
      revalidateOnFocus: false, // for keeping cache
      dedupingInterval: 600000, // cache data for 10 minutes
      errorRetryCount: 0, // retry is handled by user clicking
      onSuccess: (data) => setLocation({ name: "Your Location", coords: data }),
      onError: () => setErrorType(ErrorType.GEOLOCATION),
    },
  );

  const {
    data: { currentWeather, weeklyWeather } = {},
    isValidating,
    mutate: mutateWeather,
  } = useSWR(location?.coords ?? null, () => weatherFetcher(location?.coords), {
    revalidateOnFocus: false, // for keeping cache
    dedupingInterval: 600000, // cache data for 10 minutes
    errorRetryCount: 0, // retry is handled by user clicking
    onSuccess: () => setErrorType(undefined), //ignore geolocation error for city selecting
    onError: () => setErrorType(ErrorType.WEATHER),
  });

  const isLoading = isValidating || !currentWeather || !weeklyWeather;

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
      {errorType ? (
        <View style={styles.content}>
          <ErrorContent
            message={`Something went wrong while getting ${errorType === ErrorType.GEOLOCATION ? "your location" : "weather data"}.`}
            onRetry={
              errorType === ErrorType.GEOLOCATION
                ? mutateLocation
                : mutateWeather
            }
          />
        </View>
      ) : isLoading ? (
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
    marginTop: 20,
    paddingVertical: 40, // for menu button
  },
  contentSmall: {
    paddingTop: 20,
  },
});
export default Index;
