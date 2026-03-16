import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types";

const createUser = async (newUser: {
  name: string;
  email: string;
}): Promise<User> => {
  const { data } = await axios.post("http://localhost:3000/users", newUser);
  return data;
};

const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useAddUser;
