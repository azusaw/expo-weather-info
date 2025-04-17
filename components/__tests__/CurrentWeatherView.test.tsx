import { render } from "@testing-library/react-native";
import CurrentWeatherView from "@/components/CurrentWeatherView";

const mockProps = {
  data: {
    time: "2025-04-16T23:45",
    weatherCode: 1,
    temperature: 18.1,
    rain: 0,
    windSpeed: 10.5,
    humidity: 58,
  },
  siteName: "Tokyo",
};

describe("CurrentWeatherView", () => {
  test("it renders CurrentWeatherView successfully", () => {
    const { toJSON } = render(<CurrentWeatherView {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("it renders site name", () => {
    const { getByText } = render(<CurrentWeatherView {...mockProps} />);
    expect(getByText(mockProps.siteName)).toBeTruthy();
  });

  test("it renders default Your Location without site name", () => {
    const { getByText } = render(
      <CurrentWeatherView {...{ ...mockProps, siteName: undefined }} />,
    );
    expect(getByText("Your Location")).toBeTruthy();
  });

  test("it renders date in correct format", () => {
    const { getByText } = render(<CurrentWeatherView {...mockProps} />);
    expect(getByText("16 Apr Wed, 11 PM")).toBeTruthy();
  });

  test("it renders correct weather description", () => {
    const { getByText } = render(<CurrentWeatherView {...mockProps} />);
    expect(getByText("Mainly Sunny")).toBeTruthy();
  });

  [
    ["temperature", `${mockProps.data.temperature}`],
    ["rain", `${mockProps.data.rain}mm`],
    ["windSpeed", `${mockProps.data.windSpeed}km/h`],
    ["humidity", `${mockProps.data.humidity}%`],
  ].forEach(([name, expected]) =>
    test(`it renders ${name}`, () => {
      const { getByText } = render(<CurrentWeatherView {...mockProps} />);
      expect(getByText(expected)).toBeTruthy();
    }),
  );
});
