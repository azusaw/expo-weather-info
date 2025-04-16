import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View, Text } from "@/components/Themed";
import { getWeatherDetailFromCode } from "@/libs/getWeatherDetailFromCode";

const WeatherImage = ({ weatherCode }: { weatherCode: number }) => {
  const weatherDetail = getWeatherDetailFromCode(weatherCode);
  return (
    weatherDetail && (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={weatherDetail.image}
          contentFit="cover"
          transition={1000}
        />
        <Text size={14} weight={300}>
          {weatherDetail.description}
        </Text>
      </View>
    )
  );
};
export default WeatherImage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 80,
  },
});
