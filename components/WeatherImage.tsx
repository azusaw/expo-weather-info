import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View, Text } from "@/components/Themed";
import WeatherCodeDesc from "../constants/weather-code-desc.json";
import { WeatherCodeDetailDayNight } from "@/types/WeatherCodeDetail";

const getWeatherCodeDesc = (weatherCode: number): WeatherCodeDetailDayNight =>
  // @ts-ignore
  WeatherCodeDesc[`${weatherCode}`];

const WeatherImage = ({ weatherCode }: { weatherCode: number }) => {
  const weatherDayNight = getWeatherCodeDesc(weatherCode);
  return (
    weatherDayNight?.day && (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={weatherDayNight.day.image}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.description}>
          {weatherDayNight.day.description}
        </Text>
      </View>
    )
  );
};
export default WeatherImage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
  description: {
    fontSize: 16,
    fontWeight: 200,
  },
});
