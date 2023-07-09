import { requester } from "../constants/API";

export const createTask = async (card: { name: string; idList: string }) => {
  const res = await requester.post(
    `/cards`,
    {},
    { params: { name: card.name, idList: card.idList } }
  );
  return res.data;
};
export const deleteTask = async (id: string) => {
  return await requester.delete(`/cards/${id}`, {});
};

export const updateTask = async (id: string, { name }: { name: string }) => {
  const res = await requester.put(`/cards/${id}`, {}, { params: { name } });
  return res.data;
};
