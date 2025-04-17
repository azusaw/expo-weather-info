import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { View, Text } from "@/components/Themed";
import { getWeatherDetailFromCode } from "@/libs/getWeatherDetailFromCode";
import { useScreenSizeContext } from "@/components/ScreenSizeProvider";

const WeatherImage = ({ weatherCode }: { weatherCode: number }) => {
  const { isSmall } = useScreenSizeContext();
  const weatherDetail = getWeatherDetailFromCode(weatherCode);
  return (
    weatherDetail && (
      <View style={styles.container}>
        <Image
          style={isSmall ? styles.imageSmall : styles.image}
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
    height: 70,
    width: 80,
  },
  imageSmall: {
    height: 50,
    width: 60,
  },
});

export default WeatherImage;
