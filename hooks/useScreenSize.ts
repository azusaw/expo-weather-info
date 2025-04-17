import { useWindowDimensions } from "react-native";

export const useScreenSize = () => {
  const { height, width } = useWindowDimensions();
  return {
    isSmall: height < 800,
    height,
    width,
  };
};
