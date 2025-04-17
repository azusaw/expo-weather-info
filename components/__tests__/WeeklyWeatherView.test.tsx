import { render } from "@testing-library/react-native";
import WeeklyWeatherView from "@/components/WeeklyWeatherView";
const mockProps = {
  data: [
    {
      time: "2025-04-16T23:45",
      weatherCode: 2,
      temperatureMin: 12.5,
      temperatureMax: 19.6,
    },
    {
      time: "2025-04-17T23:45",
      weatherCode: 7,
      temperatureMin: 14.5,
      temperatureMax: 16.6,
    },
    {
      time: "2025-04-18T23:45",
      weatherCode: 23,
      temperatureMin: 10.5,
      temperatureMax: 16.8,
    },
  ],
};

describe("WeeklyWeatherView", () => {
  test("it renders WeeklyWeatherView successfully", () => {
    const { toJSON } = render(<WeeklyWeatherView {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("it renders heading", () => {
    const { getByText } = render(<WeeklyWeatherView {...mockProps} />);
    expect(getByText("Weekly forecast")).toBeTruthy();
  });

  test("it renders correct number of DailyWeather Card", () => {
    const { getByText } = render(<WeeklyWeatherView {...mockProps} />);
    ["16 Wed", "17 Thu", "18 Fri"].forEach((data) =>
      expect(getByText(data)).toBeTruthy(),
    );
  });
});
