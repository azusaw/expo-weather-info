import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const getIsSmallScreen = () => height < 800;
