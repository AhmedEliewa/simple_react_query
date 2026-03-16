import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types";
import { userKeys } from "./queryKeys";

const fetchUser = async (): Promise<User[]> => {
  const { data } = await axios.get("http://localhost:3000/users");
  return data;
};

const useFetchUsers = (): UseQueryResult<User[]> => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: fetchUser,
  });
};

export default useFetchUsers;
