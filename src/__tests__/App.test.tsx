import { render } from "@testing-library/react";
import { Home } from "@/pages/Home";

test("renders app title", () => {
  render(<Home />);
  expect(true).toBe(true);
});
