import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { getCurrentWeatherByCoords } from "@/libs/getCurrentWeatherByCoords";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import { getWeeklyWeatherByCoords } from "@/libs/getWeeklyWeatherByCoords";
import { CurrentWeather, DailyWeather } from "@/types";
import { View } from "@/components/Themed";
import CurrentWeatherView from "@/components/CurrentWeatherView";
import WeeklyWeatherView from "@/components/WeeklyWeatherView";
import { useLocationStore } from "@/store/useLocationStore";

const { width } = Dimensions.get("window");

const Home = () => {
  const location = useLocationStore((state) => state.location);
  const { setLocation } = useLocationStore();
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [weeklyWeather, setWeeklyWeather] = useState<DailyWeather[]>();

  const setCurrentLocation = async () => {
    await getCurrentCoords().then((data) =>
      setLocation({ name: "Your Location", coords: data }),
    );
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getCurrentWeatherByCoords(location.coords).then((data) =>
        setCurrentWeather(data),
      );
      getWeeklyWeatherByCoords(location.coords).then((data) =>
        setWeeklyWeather(data),
      );
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {currentWeather && (
        <CurrentWeatherView siteName={location?.name} data={currentWeather} />
      )}
      {weeklyWeather && <WeeklyWeatherView data={weeklyWeather} />}
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
    backgroundColor: "#4a4b4c",
    paddingBottom: 40, // for menu button
  },
});
export default Home;
