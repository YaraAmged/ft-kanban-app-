import { requester } from "../constants/API";

export const createColumn = async (id: string, name: string) => {
  const res = await requester.post(
    `/boards/${id}/lists`,
    {},
    { params: { name } }
  );
  return res.data;
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
