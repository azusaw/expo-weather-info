import React from "react";
import Svg from "react-native-svg";
import { IconPaths } from "@/constants/IconPaths";

export enum IconType {
  Drop = "drop",
  Rain = "rain",
  Wind = "wind",
}

type IconProps = {
  name: IconType;
  size?: number;
  color?: string;
};

const getIconPath = (name: IconType) => {
  switch (name) {
    case IconType.Drop:
      return IconPaths.drop;
    case IconType.Rain:
      return IconPaths.rain;
    case IconType.Wind:
      return IconPaths.wind;
    default:
      return <></>;
  }
};

const SvgIcon: React.FC<IconProps> = ({ name, size = 100, color = "#888" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 570 570"
    width={size}
    height={size}
    fill={color}
  >
    {getIconPath(name)}
  </Svg>
);

export default SvgIcon;
