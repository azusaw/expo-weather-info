import React from "react";
import { StyleSheet } from "react-native";
import { DailyWeather } from "@/types";
import { Card } from "@ui-kitten/components";
import { Text } from "@/components/Themed";
import WeatherImage from "@/components/WeatherImage";

const DailyWeatherCard = ({
  title,
  data,
}: {
  title: string;
  data: DailyWeather;
}) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <WeatherImage weatherCode={data.weatherCode} />
      <Text style={styles.temperature}>
        {data.temperature2mMin}
        <span style={styles.slash}>/</span>
        {data.temperature2mMax}
        <span style={styles.suffix}>℃</span>
      </Text>
    </Card>
  );
};
export default DailyWeatherCard;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    minWidth: 200,
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 24,
  },
  temperature: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    fontSize: 42,
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
