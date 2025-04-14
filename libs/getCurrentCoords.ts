import { Coords } from "@/types";
import { askAsync, LOCATION_FOREGROUND } from "expo-permissions";
import { getCurrentPositionAsync } from "expo-location";

export const getCurrentCoords = async () => {
  await getLocationPermissions();
  const {
    coords: { latitude, longitude },
  } = await getCurrentPositionAsync();
  return { latitude, longitude } as Coords;
};

const getLocationPermissions = async () =>
  await askAsync(LOCATION_FOREGROUND).then((res) => {
    if (res.status !== "granted") {
      //TODO: handle error
      throw Error;
    }
  });
