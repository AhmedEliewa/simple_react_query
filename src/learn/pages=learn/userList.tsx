import useDeleteUser from "../hooks/useDeleteUser";
import { User } from "../types";

export const UserList = ({ users }: { users: User[] }) => {
  const { mutate: deleteUser } = useDeleteUser();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
