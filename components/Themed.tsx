import { Text as DefaultText, View as DefaultView } from "react-native";
import Colors from "@/constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type FontProps = {
  size?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  color?: string;
};

export type TextProps = ThemeProps & FontProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

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

export const Text = (props: TextProps) => {
  const {
    style,
    size = 24,
    weight = 400,
    color = Colors.text.dark,
    ...otherProps
  } = props;
  const fontFamily = getFontFamily(weight);

  return (
    <DefaultText
      style={[{ fontFamily, fontSize: size, color }, style]}
      {...otherProps}
    />
  );
};

export const View = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = "inherit";

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
