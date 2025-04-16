import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const BouncingDots = () => {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const colors = [
    Colors.secondary.light,
    Colors.secondary.default,
    Colors.secondary.dark,
  ];

  useEffect(() => {
    dots.forEach((dot, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 150),
          Animated.timing(dot, {
            toValue: -10,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {dots.map((dot, idx) => (
        <Animated.View
          key={idx}
          style={[
            styles.dot,
            { backgroundColor: colors[idx], transform: [{ translateY: dot }] },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default BouncingDots;
