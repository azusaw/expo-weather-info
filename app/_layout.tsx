import React, { useEffect, useState } from "react";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import * as SplashScreen from "expo-splash-screen";
import { Link, Stack, useRouter } from "expo-router";
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

  const openCityList = () => setIsShowCityList(true);
  const closeCityList = () => setIsShowCityList(false);

  const setCurrentLocation = () => {
    //TODO: set current location to data store
    closeCityList();
  };

  const TabBarIcon = (props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
  }) => <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Toast />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <View style={styles.bottomBar}>
        <Pressable onPress={setCurrentLocation}>
          <TabBarIcon name="map-marker" />
        </Pressable>
        <Pressable onPress={openCityList}>
          <TabBarIcon name="search" />
        </Pressable>
        <CityList isVisible={isShowCityList} onClose={closeCityList} />
      </View>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxWidth: 400,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ddd",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});
