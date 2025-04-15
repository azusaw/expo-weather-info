import { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { DailyWeather } from "@/types";
import { getCurrentWeatherByCoords } from "@/libs/getCurrentWeatherByCoords";
import { View } from "@/components/Themed";
import DailyWeatherCard from "@/components/DailyWeatherCard";
import CityCoords from "@/constants/city-coords.json";
import { CurrentWeather } from "@/types/CurrentWeather";
import { getWeeklyWeatherByCoords } from "@/libs/getWeeklyWeatherByCoords";

const SelectByCity = () => {
  const [selectedCityIndex, setSelectedCityIndex] = useState<IndexPath>();
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [weeklyWeather, setWeeklyWeather] = useState<DailyWeather[]>();

  //TODO: cache it with tanstack query later
  useEffect(() => {
    if (selectedCityIndex) {
      const coords = CityCoords[selectedCityIndex.row].coords;
      getCurrentWeatherByCoords(coords).then((data) => setCurrentWeather(data));
      getWeeklyWeatherByCoords(coords).then((data) => setWeeklyWeather(data));
    }
  }, [selectedCityIndex]);

  const currentWeatherComponent = useMemo(
    () => currentWeather && <CurrentWeather {...currentWeather} />,
    [currentWeather],
  );

  const weeklyWeatherComponent = useMemo(
    () => weeklyWeather?.map((weather) => <DailyWeatherCard {...weather} />),
    [weeklyWeather],
  );

  return (
    <View style={styles.container}>
      <Select
        style={styles.selectBox}
        value={
          selectedCityIndex && selectedCityIndex?.row >= 0
            ? CityCoords[selectedCityIndex?.row].name
            : undefined
        }
        selectedIndex={selectedCityIndex}
        // @ts-ignore
        onSelect={(index) => setSelectedCityIndex(index)}
        placeholder="Select the city.."
      >
        {CityCoords.map(({ name }) => (
          <SelectItem key={name} title={name} />
        ))}
      </Select>
      {currentWeatherComponent}
      {weeklyWeatherComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectBox: {
    width: 200,
  },
});
export default SelectByCity;
