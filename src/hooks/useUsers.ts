import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IUser } from "../type/type";
import { userApi } from "../api/api";

const useUsers = (page: number): UseQueryResult<IUser[]> => {
  return useQuery({
    queryKey: ["users", { page }],
    queryFn: () => userApi.getAll(page),
    staleTime: 1000 * 60 * 2, // 2 minute
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 30, // 30 second
    refetchIntervalInBackground: false,
  });
};

export default useUsers;
