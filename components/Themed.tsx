/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/constants/Colors";
import { components } from "@eva-design/eva/mapping";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type FontProps = {
  size?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600;
  color?: string;
};

export type TextProps = ThemeProps & FontProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = "light";
  // const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

const getFontFamily = (fontWeight: number) => {
  switch (fontWeight) {
    case 100:
      return "Montserrat_100Thin";
    case 200:
      return "Montserrat_200ExtraLight";
    case 300:
      return "Montserrat_300Light";
    case 400:
      return "Montserrat_400Regular";
    case 500:
      return "Montserrat_500Medium";
    case 600:
      return "Montserrat_600SemiBold";
    case 700:
      return "Montserrat_700Bold";
    case 800:
      return "Montserrat_800ExtraBold";
    case 900:
      return "Montserrat_900Black";
    default:
      return "Montserrat_400Regular";
  }
};

export function Text(props: TextProps) {
  const { style, size = 24, weight, color = "#888", ...otherProps } = props;
  const fontFamily = getFontFamily(weight ?? 400);

  return (
    <DefaultText
      style={[{ fontFamily, fontSize: size, color }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  // const backgroundColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   "background",
  // );
  const backgroundColor = "inherit";

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
