import { render } from "@testing-library/react-native";
import WeatherImage from "@/components/WeatherImage";

describe("WeatherImage", () => {
  test("it renders WeatherImage successfully", () => {
    const { toJSON } = render(<WeatherImage weatherCode={1} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("it returns null with invalid weather code", () => {
    const { toJSON } = render(<WeatherImage weatherCode={1000} />);
    expect(toJSON()).toBeNull();
  });
});
