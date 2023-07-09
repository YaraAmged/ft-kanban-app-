import React from "react";
import { getByTestId, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { getBoards } from "./api/boards";

// describe("App", () => {
//   test("columns fetched and rendered correctly", () => {
//     const { getByTestId, getAllByTestId, getByText } = render(<App />);
//     const boards = await getBoards();
//     await waitFor(() => getByTestId("board-button").click());
//     await waitFor(() =>
//       expect(getAllByTestId("column-card").length === boards.length)
//     );
//   });
// });
