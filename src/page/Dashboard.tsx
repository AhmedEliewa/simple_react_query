import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import useAddUser from "../hooks/useAddUser";
import useDeleteUser from "../hooks/useDeleteUser";
import { useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/api";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);

  // ✅ جلب اليوزرز مع refetch تلقائي
  const { data: users, isLoading, isError, error, isFetching } = useUsers(page);
  console.log(users);
  // ✅ إضافة يوزر مع optimistic update
  const { mutate: addUser, isPending: isAdding } = useAddUser();

  // ✅ حذف يوزر مع rollback
  const { mutate: deleteUser } = useDeleteUser();

  // next page in cache
  const queryClient = useQueryClient();

  useEffect(() => {
    if (users?.length) {
      queryClient.prefetchQuery({
        queryKey: ["users", { page: page + 1 }],
        queryFn: () => userApi.getAll(page + 1),
      });
    }
  }, [users, page, queryClient]);

  const handleAdd = () => {
    if (!name || !email) return;
    addUser(
      { name, email },
      {
        onSuccess: () => {
          setName(""); // مسح الـ inputs بعد الإضافة
          setEmail("");
        },
      },
    );
  };

  if (isLoading) return <h2>جاري التحميل...</h2>;
  if (isError) return <h2>خطأ: {error.message}</h2>;

  return (
    <div>
      {/* مؤشر الـ refetch التلقائي */}
      {isFetching && <p>جاري التحديث...</p>}

      {/* فورم إضافة يوزر */}
      <div>
        <input
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="الإيميل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd} disabled={isAdding}>
          {isAdding ? "جاري الإضافة..." : "إضافة يوزر"}
        </button>
      </div>

      {/* قائمة اليوزرز */}
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} — {user.email}
            </span>
            <button onClick={() => deleteUser(user.id)}>حذف</button>
          </li>
        ))}
      </ul>
      <button
        disabled={isFetching || page === 1}
        onClick={() => setPage(page - 1)}
      >
        prev
      </button>
      <button
        disabled={isFetching || !users?.length}
        onClick={() => setPage(page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Dashboard;
