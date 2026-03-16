import useAddUser from "../hooks/useAddUser";

const AddUser = () => {
  const { mutate, isPending, isSuccess } = useAddUser();

  const handleAdd = () => {
    mutate({ name: "asd", email: "asd@example.com" });
  };

  return (
    <div>
      <button onClick={handleAdd} disabled={isPending}>
        {isPending ? "Saving..." : "Add User"}
      </button>
      {isSuccess && <p>User created!</p>}
    </div>
  );
};

export default AddUser;
