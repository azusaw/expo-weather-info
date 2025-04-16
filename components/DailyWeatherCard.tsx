import React from "react";
import { StyleSheet } from "react-native";
import { DailyWeather } from "@/types";
import { Text, View } from "@/components/Themed";
import WeatherImage from "@/components/WeatherImage";
import dayjs from "dayjs";
import Colors from "@/constants/Colors";

const DailyWeatherCard = ({
  time,
  weatherCode,
  temperatureMin,
  temperatureMax,
}: DailyWeather) => (
  <View style={styles.card}>
    <Text size={22}>{dayjs(time).format("DD ddd")}</Text>
    <WeatherImage weatherCode={weatherCode} />
    <Text size={16} weight={500} style={{ marginTop: 10 }}>
      {temperatureMin}
      <Text size={14} weight={200} style={{ marginHorizontal: 10 }}>
        {"/"}
      </Text>
      {temperatureMax}
    </Text>
  </View>
);
export default DailyWeatherCard;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: Colors.primary.default,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    maxHeight: 180,
  },
});
