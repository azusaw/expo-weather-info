import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View, Text } from "@/components/Themed";
import { getWeatherDetailFromCode } from "@/libs/getWeatherDetailFromCode";
import { getIsSmallScreen } from "@/libs/getIsSmallScreen";

const isSmall = getIsSmallScreen();

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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    height: isSmall ? 50 : 70,
    width: isSmall ? 60 : 80,
  },
});

export default WeatherImage;
