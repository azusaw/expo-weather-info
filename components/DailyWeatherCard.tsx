import React from "react";
import { StyleSheet } from "react-native";
import dayjs from "dayjs";
import { DailyWeather } from "@/types";
import { Text, View } from "@/components/Themed";
import WeatherImage from "@/components/WeatherImage";
import { useScreenSizeContext } from "@/components/ScreenSizeProvider";

const DailyWeatherCard = ({
  time,
  weatherCode,
  temperatureMin,
  temperatureMax,
}: DailyWeather) => {
  const { isSmall } = useScreenSizeContext();
  return (
    <View style={[styles.card, isSmall && styles.cardSmall]}>
      <Text size={isSmall ? 16 : 20}>{dayjs(time).format("DD ddd")}</Text>
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
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff30",
    shadowColor: "#dddddd30",
    margin: 10,
    borderRadius: 10,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    padding: 20,
  },
  cardSmall: {
    padding: 10,
  },
});

export default DailyWeatherCard;
