import { render } from "@testing-library/react-native";
import { Text, View } from "@/components/Themed";

describe("Text", () => {
  test("it renders Text successfully", () => {
    const { toJSON } = render(<Text>Hello</Text>);
    expect(toJSON()).toMatchSnapshot();
  });

  [
    [100, "Montserrat_100Thin"],
    [200, "Montserrat_200ExtraLight"],
    [300, "Montserrat_300Light"],
    [400, "Montserrat_400Regular"],
    [500, "Montserrat_500Medium"],
    [500, "Montserrat_500Medium"],
    [600, "Montserrat_600SemiBold"],
    [700, "Montserrat_700Bold"],
    [800, "Montserrat_800ExtraBold"],
    [900, "Montserrat_900Black"],
    [undefined, "Montserrat_400Regular"],
  ].forEach(([weight, font]) =>
    test(`it renders font weight ${weight}`, () => {
      // @ts-ignore
      const { getByText } = render(<Text weight={weight}>Hello</Text>);
      // @ts-ignore
      expect(getByText("Hello")).toHaveStyle({ fontFamily: font });
    }),
  );
});

describe("View", () => {
  test("it renders View successfully", () => {
    const { toJSON } = render(<View>Hello</View>);
    expect(toJSON()).toMatchSnapshot();
  });
});
