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
      return null;
  }
};

const SvgIcon = ({ name, size = 100, color = "#888" }: IconProps) => {
  const path = getIconPath(name);
  return (
    path && (
      <Svg viewBox="0 0 570 570" width={size} height={size} fill={color}>
        {path}
      </Svg>
    )
  );
};

export default SvgIcon;
