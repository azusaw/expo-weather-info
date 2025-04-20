import { Coords } from "@/types";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export const getCurrentCoords = async (): Promise<Coords> => {
  // check network
  const { isConnected } = await NetInfo.fetch();
  if (!isConnected) {
    Toast.show({
      type: "error",
      text1: "Unable to retrieve your location",
      text2: "Please reconnect internet and try again.",
    });
    throw new Error("No internet connection");
  }

  // check location permission
  let permission = await requestForegroundPermissionsAsync();
  if (permission?.status !== "granted") {
    Toast.show({
      type: "error",
      text1: "Permission is denied",
      text2: "Location permission is required in system settings.",
    });
    throw new Error("No permission for user location");
  }

  const { coords } = await getCurrentPositionAsync();
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};
