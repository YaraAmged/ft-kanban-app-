import { requester } from "../constants/API";
import { Column } from "../features/columns/columnsSlice";
import { createColumn, deleteColumn } from "./columns";

export const createBoard = async ({
  name,
  columns,
}: {
  name: string;
  columns: string[];
}) => {
  const res = await requester.post(
    "/boards",
    {},
    { params: { name, defaultLists: false } }
  );
  const board = res.data;
  const createdColumns: Column[] = [];
  for (let column of columns) {
    createdColumns.push(await createColumn(board.id, column));
  }
  board.columns = createdColumns;
  return board;
};
export const deleteBoard = async (id: string) => {
  await requester.delete(`/boards/${id}`);
};
export const updateBoardAPI = async (
  oldBoard: { id: string; columns: Column[] },
  {
    name,
    columns,
  }: {
    name: string;
    columns: string[];
  }
) => {
  const columnsToBeRemoved = oldBoard.columns.filter(
    (col) => !columns.includes(col.name)
  );
  const columnsToBeAdded = columns.filter(
    (col) => oldBoard.columns.findIndex((column) => column.name === col) === -1
  );
  const createdColumns = [];
  for (let column of columnsToBeAdded) {
    createdColumns.push({
      ...(await createColumn(oldBoard.id, column)),
      cards: [],
    });
  }
  for (let column of columnsToBeRemoved) {
    await deleteColumn(column.id);
  }

  const res = await requester.put(
    `/boards/${oldBoard.id}`,
    {},
    { params: { name } }
  );
  res.data.columns = oldBoard.columns
    .filter((col) => columns.includes(col.name))
    .concat(createdColumns);
  return res.data;
};

export const getBoards = async () => {
  const res = await requester.get("/members/me/boards");
  return res.data;
};
