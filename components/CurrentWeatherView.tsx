import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { getWeatherDetailFromCode } from "@/libs/getWeatherDetailFromCode";
import { CurrentWeather } from "@/types";

const CurrentWeatherView = ({
  data,
  siteName = "Your Location",
}: {
  data: CurrentWeather;
  siteName?: string;
}) => (
  <View style={styles.container}>
    <Text style={styles.siteName}>{siteName}</Text>
    <Text style={styles.time}>{dayjs(data.time).format("dddd, d MMM")}</Text>
    <Text style={styles.description}>
      {getWeatherDetailFromCode(data.weatherCode).description}
    </Text>
    <Text style={styles.temperature}>{`${data.temperature}°`}</Text>
    <View style={styles.card}>
      <View>{data.rain}</View>
      <Text>{data.windSpeed}km/h</Text>
      <Text>{data.relativeHumidity}%</Text>
    </View>
  </View>
);
export default CurrentWeatherView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    minWidth: 400,
  },
  siteName: {
    fontWeight: 500,
    fontSize: 28,
    marginBottom: 36,
  },
  time: {
    fontWeight: 300,
    fontSize: 16,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    color: "#fff",
    marginBottom: 18,
  },
  description: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 18,
  },
  temperature: {
    fontSize: 140,
    fontWeight: 400,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 18,
    backgroundColor: "#222",
    borderRadius: 10,
    paddingVertical: 8,
    fontSize: 24,
    color: "#fff",
    width: 350,
    height: 150,
  },
  cardItem: {
    fontSize: 24,
    // color: "#fff",
  },
});
