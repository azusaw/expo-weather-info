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
    throw Error;
  }

  // check location permission
  await getLocationPermissions();

  return getCurrentPositionAsync().then(
    ({ coords }) =>
      ({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      }) as Coords,
  );
};

const getLocationPermissions = async () => {
  let { status } = await requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Toast.show({
      type: "error",
      text1: "Permission is denied",
      text2: "Location permission is required in system settings.",
    });
    throw Error;
  }
};
