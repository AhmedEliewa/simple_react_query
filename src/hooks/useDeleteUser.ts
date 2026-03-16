import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { IUser } from "../type/type";
import { userApi } from "../api/api";

const useDeleteUser = (): UseMutationResult<IUser, Error, number> => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: userApi.delete,
    onMutate: async (id: number) => {
      await queryclient.cancelQueries({ queryKey: ["users"] });
      const prevUsers = queryclient.getQueryData<IUser[]>(["users"]);
      queryclient.setQueryData<IUser[]>(["users"], (oldUsers) => {
        if (!oldUsers) return [];
        return oldUsers.filter((user) => user.id !== id);
      });
      return { prevUsers };
    },
    onError: (_error, _id, context) => {
      if (context?.prevUsers) {
        queryclient.setQueryData<IUser[]>(["users"], context.prevUsers);
      }
    },
    onSettled: () => {
      queryclient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useDeleteUser;
