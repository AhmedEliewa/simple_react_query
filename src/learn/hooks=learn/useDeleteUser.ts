// import axios from "axios";
// import { User } from "../types";
// import {
//   useMutation,
//   UseMutationResult,
//   useQueryClient,
// } from "@tanstack/react-query";

// const deleteUser = async (id: number): Promise<User> => {
//   const res = await axios.delete(`http://localhost:3000/users/${id}`);
//   return res.data;
// };

// const useDeleteUser = (): UseMutationResult<User> => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteUser,
//     // Optimistic update
//     onMutate: async (userId: number) => {
//       await queryClient.cancelQueries({ queryKey: ["users"] });
//       const prevUsers = queryClient.getQueryData<User[]>(["users"]);
//       queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
//         if (!oldUsers) return [];
//         return oldUsers.filter((user) => user.id !== userId);
//       });
//       return { prevUsers };
//     },
//     // Rollback on error

//     onError: (error, userId, context) => {
//       if (context?.prevUsers) {
//         queryClient.setQueryData(["users"], context.prevUsers);
//       }
//     },
//     // Refetch after success or error
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//   });
// };

// export default useDeleteUser;

import axios from "axios";
import { User } from "../types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

const deleteUser = async (id: number): Promise<User> => {
  const res = await axios.delete(`http://localhost:3000/users/${id}`);
  return res.data;
};

const useDeleteUser = (): UseMutationResult<
  User,
  Error,
  number,
  { prevUsers?: User[] }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    // optimistic update
    onMutate: async (userId: number) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevUsers = queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
        if (!oldUsers) return oldUsers;
        return oldUsers.filter((user) => user.id !== userId);
      });

      return { prevUsers };
    },

    // rollback if error happens
    onError: (_error, _userId, context) => {
      if (context?.prevUsers) {
        queryClient.setQueryData(["users"], context.prevUsers);
      }
    },

    // refetch after mutation
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useDeleteUser;
