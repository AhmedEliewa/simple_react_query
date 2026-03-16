import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { User } from "../types";

export const fetchUsers = async (page: number): Promise<User[]> => {
  const response = await fetch(
    `http://localhost:3000/users?_page=${page}&_limit=3`,
  );
  return response.json();
};

const usePaginate = (page: number) => {
  return useQuery({
    queryKey: ["users", { page }],
    queryFn: () => fetchUsers(page),
    staleTime: 2000,
    placeholderData: keepPreviousData,
  });
};

export default usePaginate;
