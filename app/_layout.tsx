import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { ScreenSizeProvider } from "@/components/ScreenSizeProvider";
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

const RootLayout = () => {
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
};

enum TAB_ITEM {
  LOCATION = "location",
  CITY = "city",
}

enum TAB_ICON {
  MAP = "map-marker",
  SEARCH = "search",
}

const RootLayoutNav = () => {
  const { setLocation } = useLocationStore();
  const [activeTab, setActiveTab] = useState<TAB_ITEM | undefined>(
    TAB_ITEM.LOCATION,
  );
  const [isShowCityList, setIsShowCityList] = useState(false);
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(-1);

  const toggleCityList = () => setIsShowCityList(!isShowCityList);

  const onPressLocationTab = async () => {
    setSelectedCityIndex(-1);
    setActiveTab(TAB_ITEM.LOCATION);
    await getCurrentCoords().then((data) =>
      setLocation({ name: "Your Location", coords: data }),
    );
    isShowCityList && toggleCityList();
  };

  const onPressCityTab = async () => {
    // set undefined for making it inactive if user clicks city tab for closing select popup
    setActiveTab(isShowCityList ? undefined : TAB_ITEM.CITY);
    toggleCityList();
  };

  const onChangeCity = (index: number) => {
    setSelectedCityIndex(index);
    toggleCityList();
  };

  const TabBarIcon = (props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
  }) => <FontAwesome size={28} {...props} />;

  const cityListAnimatedStyle = useAnimatedStyle(() => ({
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
  }));

  const tabs: {
    key: string;
    icon: TAB_ICON;
    onPress: () => void;
  }[] = [
    { key: TAB_ITEM.LOCATION, icon: TAB_ICON.MAP, onPress: onPressLocationTab },
    { key: TAB_ITEM.CITY, icon: TAB_ICON.SEARCH, onPress: onPressCityTab },
  ];

  return (
    <ScreenSizeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Animated.View style={cityListAnimatedStyle}>
        <CityList {...{ selectedCityIndex }} onChange={onChangeCity} />
      </Animated.View>
      <SafeAreaView edges={["bottom"]} style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          {tabs.map(({ key, icon, onPress }) => (
            <Pressable onPress={onPress}>
              <TabBarIcon
                name={icon}
                color={
                  activeTab === key
                    ? Colors.secondary.default
                    : Colors.primary.dark
                }
              />
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
      <Toast />
    </ScreenSizeProvider>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff50",
    paddingVertical: 10,
  },
  tabItem: {
    color: Colors.primary.default,
  },
  activeTabItem: {
    color: Colors.secondary.default,
  },
});

export default RootLayout;
