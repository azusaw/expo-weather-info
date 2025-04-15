import React from "react";
import { StyleSheet } from "react-native";
import { DailyWeather } from "@/types";
import { Text, View } from "@/components/Themed";
import WeatherImage from "@/components/WeatherImage";
import dayjs from "dayjs";

const DailyWeatherCard = ({
  time,
  weatherCode,
  temperatureMin,
  temperatureMax,
}: DailyWeather) => (
  <View style={styles.card}>
    <Text style={styles.date}>{dayjs(time).format("DD ddd")}</Text>
    <WeatherImage weatherCode={weatherCode} />
    <Text style={styles.temperature}>
      {temperatureMin}
      <Text style={styles.slash}>/</Text>
      {temperatureMax}
      <Text style={styles.suffix}>℃</Text>
    </Text>
  </View>
);
export default DailyWeatherCard;

const styles = StyleSheet.create({
  card: {
    minWidth: 200,
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    borderRadius: 10,
  },
  date: {
    textAlign: "center",
    fontSize: 24,
  },
  temperature: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    fontSize: 20,
    fontWeight: 100,
  },
  slash: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 24,
  },
  suffix: {
    marginLeft: 10,
    fontSize: 24,
  },
});
