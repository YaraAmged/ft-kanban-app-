import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("columns fetched and rendered correctly", async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId("board-button").click());
    await waitFor(() =>
      expect(screen.getAllByTestId("column-card").length > 0)
    );
  });
});
