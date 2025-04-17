import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { getWeatherDetailFromCode } from "@/libs/getWeatherDetailFromCode";
import { CurrentWeather } from "@/types";
import Icon, { IconType } from "@/components/SvgIcon";
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
      <Text size={36} weight={700} style={styles.siteName}>
        {siteName}
      </Text>
      <Text size={16} weight={300} style={styles.date}>
        {dayjs(data.time).format("DD MMM ddd, hh A")}
      </Text>
      <Text size={24} weight={300}>
        {getWeatherDetailFromCode(data.weatherCode).description}
      </Text>
      <Text size={120} weight={400} style={styles.temperature}>
        {data.temperature}
        <View style={styles.unit}>
          <View style={styles.unitCircle} />
        </View>
      </Text>
      <View style={styles.card}>
        {infoItems.map(({ label, icon, data }) => (
          <View key={label} style={styles.cardItem}>
            <Icon name={icon} size={40} color={Colors.primary.default} />
            <Text size={18} style={{ marginTop: 20 }}>
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
  temperature: {
    position: "relative",
  },
  unit: {
    position: "absolute",
    top: 30,
    right: -30,
  },
  unitCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 4,
    borderColor: Colors.text.light,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 320,
    paddingVertical: 30,
    marginTop: 18,
    borderRadius: 10,
    backgroundColor: Colors.primary.dark,
  },
  cardItem: {
    alignItems: "center",
  },
});

export default CurrentWeatherView;
