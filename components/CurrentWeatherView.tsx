import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { getWeatherDetailFromCode } from "@/libs/getWeatherDetailFromCode";
import { CurrentWeather } from "@/types";
import Icon, { IconType } from "@/components/Icon";
import Colors from "@/constants/Colors";

const CurrentWeatherView = ({
  data,
  siteName = "Your Location",
}: {
  data: CurrentWeather;
  siteName?: string;
}) => {
  const infoItems: { label: string; icon: IconType; data: string }[] = [
    { label: "Rain", icon: IconType.Rain, data: `${data.rain}mm` },
    { label: "Wind", icon: IconType.Wind, data: `${data.windSpeed}km/h` },
    { label: "Humidity", icon: IconType.Drop, data: `${data.humidity}%` },
  ];
  return (
    <View style={styles.container}>
      <Text size={28} weight={600} style={styles.siteName}>
        {siteName}
      </Text>
      <Text size={16} weight={300} style={styles.date}>
        {dayjs(data.time).format("dddd, d MMM")}
      </Text>
      <Text size={24} weight={300}>
        {getWeatherDetailFromCode(data.weatherCode).description}
      </Text>
      <Text size={140} weight={400}>
        {data.temperature}
      </Text>
      <View style={styles.card}>
        {infoItems.map(({ label, icon, data }) => (
          <View style={styles.cardItem}>
            <Icon name={icon} size={40} color={Colors.primary.default} />
            <Text size={24} style={{ marginTop: 20 }}>
              {data}
            </Text>
            <Text size={14} style={{ marginTop: 10 }}>
              {label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    minWidth: 400,
    backgroundColor: "inherit",
  },
  siteName: {
    marginBottom: 20,
  },
  date: {
    backgroundColor: Colors.primary.dark,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    color: "#fff",
    marginBottom: 24,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 320,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: Colors.primary.dark,
  },
  cardItem: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
});

export default CurrentWeatherView;
