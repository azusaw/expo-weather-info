import { render } from "@testing-library/react-native";
import BouncingDots from "@/components/BouncingDots";

describe("BouncingDots", () => {
  test("it renders BouncingDots successfully", () => {
    const { toJSON } = render(<BouncingDots />);
    expect(toJSON()).toMatchSnapshot();
  });
});
