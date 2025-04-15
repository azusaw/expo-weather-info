import { Coords } from "@/types";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import Toast from "react-native-toast-message";

export const getCurrentCoords = async () => {
  await getLocationPermissions();
  const {
    coords: { latitude, longitude },
  } = await getCurrentPositionAsync();
  return { latitude, longitude } as Coords;
};

const getLocationPermissions = async () => {
  let { status } = await requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Toast.show({
      type: "error",
      text1: "Permission was denied",
      text2: "It needs a location permission from a system settings.",
    });
  }
};
