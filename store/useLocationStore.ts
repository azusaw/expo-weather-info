import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { Coords } from "@/types";

export type Location = {
  name: string;
  coords: Coords;
};

type Store = {
  location: Location | undefined;
  setLocation: (location: Location) => Promise<void>;
};

export const useLocationStore = create<Store>((set) => ({
  location: undefined,
  setLocation: async (location: Location) => {
    await AsyncStorage.setItem("name", location.name);
    await AsyncStorage.setItem("latitude", `${location.coords.latitude}`);
    await AsyncStorage.setItem("longitude", `${location.coords.longitude}`);
    set({ location });
  },
  // loadCoords: async () => {
  //   const name = await AsyncStorage.getItem("name");
  //   const latitude = await AsyncStorage.getItem("latitude");
  //   const longitude = await AsyncStorage.getItem("longitude");
  //   set({
  //     location: {
  //       name: name ?? "",
  //       coords: { latitude: Number(latitude), longitude: Number(longitude) },
  //     },
  //   });
  // },
}));
