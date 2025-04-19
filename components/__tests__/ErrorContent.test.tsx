import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import ErrorContent from "@/components/ErrorContent";

const mockProps = {
  message: "Something went wrong while getting weather data.",
  onRetry: jest.fn,
};

describe("ErrorContent", () => {
  test("it renders ErrorContent successfully", () => {
    const { toJSON } = render(<ErrorContent {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("it renders message", () => {
    const { getByText } = render(<ErrorContent {...mockProps} />);
    expect(getByText(mockProps.message)).toBeTruthy();
  });

  test("it calls onRetry when button is clicked", () => {
    const { getByRole } = render(<ErrorContent {...mockProps} />);
    const target = getByRole("button");
    fireEvent.press(target);
    waitFor(() => expect(mockProps.onRetry).toHaveBeenCalled());
  });
});
