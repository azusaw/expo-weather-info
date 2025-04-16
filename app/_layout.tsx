import React, { useEffect, useState } from "react";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
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
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { View } from "@/components/Themed";
import { Pressable, StyleSheet } from "react-native";
import CityList from "@/components/CityList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";

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
  const [isShowCityList, setIsShowCityList] = useState(false);

  const toggleCityList = () => setIsShowCityList(!isShowCityList);

  const setCurrentLocation = () => {
    //TODO: set current location to data store
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
    <ApplicationProvider {...eva} theme={eva.light}>
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
    </ApplicationProvider>
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
