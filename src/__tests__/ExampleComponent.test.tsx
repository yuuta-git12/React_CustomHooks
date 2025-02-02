import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ExampleComponent } from "../ExampleComponent";

test("テキストが正しく表示される", () => {
  render(<ExampleComponent text="Hello, Jest!" />);
  const element = screen.getByTestId("example-text");
  expect(element).toHaveTextContent("Hello, Jest!");
});
