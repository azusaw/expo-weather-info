import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View, Text } from "@/components/Themed";
import { getWeatherDetailFromCode } from "@/libs/getWeatherDetailFromCode";

const WeatherImage = ({
  weatherCode,
  withLabel = true,
  isLarge = false,
}: {
  weatherCode: number;
  withLabel?: boolean;
  isLarge?: boolean;
}) => {
  const weatherDetail = getWeatherDetailFromCode(weatherCode);
  return (
    weatherDetail && (
      <View style={styles.container}>
        <Image
          style={isLarge ? styles.imageLarge : styles.image}
          source={weatherDetail.image}
          contentFit="cover"
          transition={1000}
        />
        {withLabel && (
          <Text style={styles.description}>{weatherDetail.description}</Text>
        )}
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
    padding: 10,
    height: 100,
    width: 120,
  },
  imageLarge: {
    height: 140,
    width: 200,
  },
  description: {
    fontSize: 16,
    fontWeight: 200,
  },
});
