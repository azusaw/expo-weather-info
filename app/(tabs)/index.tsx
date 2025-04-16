import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getCurrentWeatherByCoords } from "@/libs/getCurrentWeatherByCoords";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import { Coords, DailyWeather } from "@/types";
import { Text, View } from "@/components/Themed";
import { getWeeklyWeatherByCoords } from "@/libs/getWeeklyWeatherByCoords";
import CurrentWeatherView from "@/components/CurrentWeatherView";
import { CurrentWeather } from "@/types/CurrentWeather";
import WeeklyWeatherView from "@/components/WeeklyWeatherView";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [weeklyWeather, setWeeklyWeather] = useState<DailyWeather[]>();
  const [coords, setCoords] = useState<Coords>();

  useEffect(() => {
    //TODO: refactor it later
    async function setLocation() {
      await getCurrentCoords().then((data) => setCoords(data));
    }
    setLocation();
  }, []);

  useEffect(() => {
    if (coords) {
      getCurrentWeatherByCoords(coords).then((data) => setCurrentWeather(data));
      getWeeklyWeatherByCoords(coords).then((data) => setWeeklyWeather(data));
    }
  }, [coords]);

  return (
    <View style={styles.container}>
      {currentWeather && <CurrentWeatherView data={currentWeather} />}
      {weeklyWeather && <WeeklyWeatherView data={weeklyWeather} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a4b4c",
  },
});
export default Home;
