import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { getCurrentWeatherByCoords } from "@/libs/getCurrentWeatherByCoords";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import { Coords, DailyWeather } from "@/types";
import { View } from "@/components/Themed";
import DailyWeatherCard from "@/components/DailyWeatherCard";
import { getWeeklyWeatherByCoords } from "@/libs/getWeeklyWeatherByCoords";
import CurrentWeatherView from "@/components/CurrentWeatherView";
import { CurrentWeather } from "@/types/CurrentWeather";

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
      <View style={styles.weeklyWeather}>
        <FlatList
          horizontal
          scrollEnabled={false}
          data={weeklyWeather}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <DailyWeatherCard {...item} />}
          keyExtractor={(item) => item.time}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccecff",
  },
  weeklyWeather: {
    flex: 1,
    backgroundColor: "lightblue",
    maxHeight: 300,
  },
  list: {
    padding: 10,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: "pink",
  },
});
export default Home;
