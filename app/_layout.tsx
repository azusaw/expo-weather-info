import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import Toast from "react-native-toast-message";
import { View } from "@/components/Themed";
import CityList from "@/components/CityList";
import { getCurrentCoords } from "@/libs/getCurrentCoords";
import Colors from "@/constants/Colors";
import { useLocationStore } from "@/store/useLocationStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // It makes able to back from a non-page component (eg. Modal)
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// Need it for fonts and page loading.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    loaded && SplashScreen.hideAsync();
  }, [loaded]);

  return loaded ? <RootLayoutNav /> : null;
}

const RootLayoutNav = () => {
  const { setLocation } = useLocationStore();
  const [isShowCityList, setIsShowCityList] = useState(false);

  const toggleCityList = () => setIsShowCityList(!isShowCityList);

  const setCurrentLocation = async () => {
    await getCurrentCoords().then((data) =>
      setLocation({ name: "Your Location", coords: data }),
    );
    isShowCityList && toggleCityList();
  };

  const TabBarIcon = (props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
  }) => (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3, color: Colors.primary.dark }}
      {...props}
    />
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(isShowCityList ? 0 : -20, {
            stiffness: 200,
            damping: 20,
          }),
        },
      ],
      opacity: withSpring(isShowCityList ? 1 : 0),
      pointerEvents: isShowCityList ? "auto" : "none",
    };
  });

  return (
    <>
      <Toast />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Animated.View style={animatedStyle}>
        <CityList onClose={toggleCityList} />
      </Animated.View>
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          <Pressable onPress={setCurrentLocation}>
            <TabBarIcon name="map-marker" />
          </Pressable>
          <Pressable onPress={toggleCityList}>
            <TabBarIcon name="search" />
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    alignItems: "center",
  },
  bottomBar: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxWidth: 400,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.primary.default,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});
