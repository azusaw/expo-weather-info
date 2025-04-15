import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getWeatherByCoords } from "@/libs/getWeatherByCoords";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import { Coords, DailyWeather } from "@/types";
import { View } from "@/components/Themed";
import DailyWeatherCard from "@/components/DailyWeatherCard";

const Home = () => {
  const [dailyWeather, setDailyWeather] = useState<DailyWeather>();
  const [coords, setCoords] = useState<Coords>();

  useEffect(() => {
    //TODO: refactor it later
    async function setLocation() {
      await getCurrentCoords().then((data) => setCoords(data));
    }
    setLocation();
  }, []);

  useEffect(() => {
    coords && getWeatherByCoords(coords).then((data) => setDailyWeather(data));
  }, [coords]);

  return (
    <View style={styles.container}>
      {dailyWeather && (
        <DailyWeatherCard title="Your location" data={dailyWeather} />
      )}
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
