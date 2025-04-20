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
}));
