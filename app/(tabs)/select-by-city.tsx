import { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { DailyWeather } from "@/types";
import { getWeatherByCoords } from "@/libs/getWeatherByCoords";
import { View } from "@/components/Themed";
import DailyWeatherCard from "@/components/DailyWeatherCard";
import CityCoords from "@/constants/city-coords.json";

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
        <DailyWeatherCard
          title={CityCoords[selectedCityIndex.row].name}
          data={dailyWeather}
        />
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
