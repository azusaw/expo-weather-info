import { fireEvent, render, waitFor } from "@testing-library/react-native";
import CityList from "@/components/CityList";
import CityLocations from "@/assets/json/city-location.json";

jest.mock("react-native/Libraries/Animated/Easing", () => ({
  bezier: jest.fn(),
}));

const mockProps = {
  onChange: jest.fn,
};

describe("CityList", () => {
  test("it renders CityList successfully", () => {
    const { toJSON } = render(<CityList {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("it renders all the city name", () => {
    CityLocations.forEach((city) => {
      const { getByText } = render(<CityList {...mockProps} />);
      expect(getByText(city.name)).toBeTruthy();
    });
  });

  test("it calls onChange when select item clicked", () => {
    const { getByText } = render(<CityList {...mockProps} />);
    const target = getByText(CityLocations[0].name);
    fireEvent.press(target);
    waitFor(() => expect(mockProps.onChange()).toHaveBeenCalled());
  });
});
