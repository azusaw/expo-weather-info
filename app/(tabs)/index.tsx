import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { getWeatherByCoords } from "@/libs/getWeatherByCoords";
import { Coords, DailyWeather } from "@/types";
import { getCurrentCoords } from "@/libs/getCurrentCoords";

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
        <ul>
          <li>weather_code: {dailyWeather.weather_code}</li>
          <li>temperature_2m_min: {dailyWeather.temperature_2m_min}</li>
          <li>temperature_2m_max: {dailyWeather.temperature_2m_max}</li>
        </ul>
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
