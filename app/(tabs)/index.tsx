import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getCurrentWeatherByCoords } from "@/libs/getCurrentWeatherByCoords";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import { Coords, DailyWeather } from "@/types";
import { View } from "@/components/Themed";
import DailyWeatherCard from "@/components/DailyWeatherCard";
import { getWeeklyWeatherByCoords } from "@/libs/getWeeklyWeatherByCoords";
import Toast from "react-native-toast-message";

const Home = () => {
  const [dailyWeather, setDailyWeather] = useState<DailyWeather>();
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
      getCurrentWeatherByCoords(coords).then((data) => setDailyWeather(data));
      getWeeklyWeatherByCoords(coords).then((data) => setWeeklyWeather(data));
    }
  }, [coords]);

  return (
    <View style={styles.container}>
      {dailyWeather && (
        <DailyWeatherCard title="Your location" data={dailyWeather} />
      )}
      {weeklyWeather?.map((weather) => (
        <DailyWeatherCard title="Your location" data={weather} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
