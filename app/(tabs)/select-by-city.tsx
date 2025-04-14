import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
import { DailyWeather } from "@/types";
import { getWeatherByCoords } from "@/libs/getWeatherByCoords";
import CityCoords from "@/constants/CityCoords.json";

const SelectByCity = () => {
  const [selectedCityIndex, setSelectedCityIndex] = useState<IndexPath>();
  const [dailyWeather, setDailyWeather] = useState<DailyWeather>();

  //TODO: cache it with tanstack query later
  useEffect(() => {
    selectedCityIndex &&
      getWeatherByCoords(CityCoords[selectedCityIndex.row].coords).then(
        (data) => setDailyWeather(data),
      );
  }, [selectedCityIndex]);

  const dailyWeatherComponent = useMemo(
    () =>
      dailyWeather && (
        <ul>
          <li>weather_code: {dailyWeather.weather_code}</li>
          <li>temperature_2m_min: {dailyWeather.temperature_2m_min}</li>
          <li>temperature_2m_max: {dailyWeather.temperature_2m_max}</li>
        </ul>
      ),
    [dailyWeather],
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
          <SelectItem title={name} />
        ))}
      </Select>
      {dailyWeatherComponent}
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
