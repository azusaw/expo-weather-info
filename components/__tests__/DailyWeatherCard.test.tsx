import { render } from "@testing-library/react-native";
import DailyWeatherCard from "@/components/DailyWeatherCard";

const mockProps = {
  time: "2025-04-16T23:45",
  weatherCode: 2,
  temperatureMin: 12.5,
  temperatureMax: 19.6,
};

describe("DailyWeatherCard", () => {
  test("it renders DailyWeatherCard successfully", () => {
    const { toJSON } = render(<DailyWeatherCard {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("it renders date in correct format", () => {
    const { getByText } = render(<DailyWeatherCard {...mockProps} />);
    expect(getByText("16 Wed")).toBeTruthy();
  });

  test("it renders correct weather description", () => {
    const { getByText } = render(<DailyWeatherCard {...mockProps} />);
    expect(getByText("Partly Cloudy")).toBeTruthy();
  });

  test(`it renders temperature`, () => {
    const { getByText } = render(<DailyWeatherCard {...mockProps} />);
    expect(
      getByText(`${mockProps.temperatureMin}/${mockProps.temperatureMax}`),
    ).toBeTruthy();
  });
});
