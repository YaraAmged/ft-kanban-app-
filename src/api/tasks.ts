import { requester } from "../constants/API";
import { TaskI } from "../features/columns/columnsSlice";

export const createTask = async (card: Omit<TaskI, "id">) => {
  const res = await requester.post(
    "/cards",
    {},
    { params: { name: card.name, idList: card.idList, desc: card.desc } }
  );
  return res.data;
};
export const deleteTask = async (id: string) => {
  return await requester.delete(`/cards/${id}`);
};

export const updateTask = async (id: string, task: Omit<TaskI, "id">) => {
  const res = await requester.put(`/cards/${id}`, {}, { params: task });
  return res.data;
};
