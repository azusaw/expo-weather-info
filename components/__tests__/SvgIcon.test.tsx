import { render } from "@testing-library/react-native";
import SvgIcon, { IconType } from "@/components/SvgIcon";

const mockProps = {
  name: IconType.Drop,
};

describe("SvgIcon", () => {
  test("it renders SvgIcon successfully", () => {
    const { toJSON } = render(<SvgIcon {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  Object.values(IconType).forEach((icom) =>
    test(`it renders ${icom} icon successfully`, () => {
      const component = render(<SvgIcon name={icom} />);
      expect(component).toBeTruthy();
    }),
  );

  test("it renders null when name is not match", () => {
    // @ts-ignore
    const { toJSON } = render(<SvgIcon name="hoge" />);
    expect(toJSON()).toBeNull();
  });
});
