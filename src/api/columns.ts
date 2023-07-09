import { requester } from "../constants/API";

export const createColumn = async (id: string, name: string) => {
  const res = await requester.post(
    `/boards/${id}/lists`,
    {},
    { params: { name } }
  );
  const column = res.data;
  column.cards = [];
  return column;
};
export const deleteColumn = async (id: string) => {
  return await requester.put(
    `/lists/${id}/closed`,
    {},
    { params: { value: true } }
  );
};

export const getColumns = async (id: string) => {
  const res = await requester.get(`/boards/${id}/lists`, {
    params: { cards: "all" },
  });
  return res.data;
};
