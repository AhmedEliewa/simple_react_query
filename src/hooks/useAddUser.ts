import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { IUser } from "../type/type";
import { userApi } from "../api/api";

const useAddUser = (): UseMutationResult<IUser, Error, Omit<IUser, "id">> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.add,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const prevUsers = queryClient.getQueryData<IUser[]>(["users"]);
      queryClient.setQueryData<IUser[]>(["users"], (oldUser) => {
        if (!oldUser) return [];
        return [...oldUser, { ...newUser, id: Date.now() }];
      });
      return { prevUsers };
    },

    onError: (_error, _newUser, context) => {
      if (context?.prevUsers) {
        queryClient.setQueryData<IUser[]>(["users"], context.prevUsers);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useAddUser;
