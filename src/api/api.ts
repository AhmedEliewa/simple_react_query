import axios from "axios";
import { IUser } from "../type/type";

const BASE = "http://localhost:3000";

export const userApi = {
  getAll: async (page: number): Promise<IUser[]> => {
    const res = await axios.get<IUser[]>(
      `${BASE}/users?_page=${page}&_limit=3`,
    );
    return res.data;
  },

  add: async (newUser: Omit<IUser, "id">): Promise<IUser> => {
    const res = await axios.post(`${BASE}/users`, newUser);
    return res.data;
  },
  delete: async (id: number): Promise<IUser> => {
    const res = await axios.delete(`${BASE}/users/${id}`);
    return res.data;
  },
};
