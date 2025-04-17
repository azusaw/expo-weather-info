import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import DailyWeatherCard from "@/components/DailyWeatherCard";
import { DailyWeather } from "@/types";
import Colors from "@/constants/Colors";
import { useScreenSizeContext } from "@/components/ScreenSizeProvider";

const WeeklyWeatherView = ({ data }: { data: DailyWeather[] }) => {
  const { width, isSmall } = useScreenSizeContext();
  return (
    <View style={{ height: isSmall ? 230 : 280, maxWidth: width }}>
      <View style={[styles.title, isSmall && styles.titleSmall]}>
        <Text size={20} weight={300} color={Colors.text.light}>
          {"Weekly forecast"}
        </Text>
        <View style={styles.arrowContainer}>
          <View style={[styles.arrow, styles.arrowHorizontal]} />
          <View style={[styles.arrow, styles.arrowDiagonal]} />
        </View>
      </View>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <DailyWeatherCard {...item} />}
        keyExtractor={(item) => item.time}
        contentContainerStyle={{ paddingHorizontal: 10, height: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  titleSmall: {
    marginTop: 10,
  },
  arrowContainer: {
    position: "relative",
    backgroundColor: "transparent",
    width: 60,
    height: 50,
    right: 0,
  },
  arrow: {
    backgroundColor: Colors.text.light,
    position: "absolute",
    height: 1,
    borderRadius: 5,
  },
  arrowHorizontal: {
    width: 58,
    bottom: "40%",
  },
  arrowDiagonal: {
    width: 15,
    bottom: "50%",
    right: 0,
    transform: [{ rotate: "45deg" }],
  },
});

export default WeeklyWeatherView;
