import { render } from "@testing-library/react-native";
import {
  ScreenSizeProvider,
  useScreenSizeContext,
} from "@/components/ScreenSizeProvider";
import { Text } from "@/components/Themed";

jest.mock("@/hooks/useScreenSize", () => ({
  useScreenSize: () => ({
    isSmall: true,
    width: 320,
    height: 640,
  }),
}));

describe("ScreenSizeProvider", () => {
  test("it provides screen size values via context", () => {
    const TestComponent = () => {
      const { isSmall, width, height } = useScreenSizeContext();
      return (
        <Text>
          {isSmall.toString()} - {width}x{height}
        </Text>
      );
    };

    const { getByText } = render(
      <ScreenSizeProvider>
        <TestComponent />
      </ScreenSizeProvider>,
    );

    expect(getByText("true - 320x640")).toBeTruthy();
  });
});
