// import { useEffect, useState } from "react";

// import { useQueryClient } from "@tanstack/react-query";
// import usePaginate, { fetchUsers } from "../hooks/usePaginate";

// const Paginate = () => {
//   const [page, setPage] = useState(1);

//   const { data, isLoading } = usePaginate(page);

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     if (data?.length) {
//       queryClient.prefetchQuery({
//         queryKey: ["users", { page: page + 1 }],
//         queryFn: () => fetchUsers(page + 1),
//       });
//     }
//   }, [page, queryClient, data]);

//   if (isLoading) return <h1>Loading...</h1>;

//   return (
//     <>
//       <ul>
//         {data?.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>

//       <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
//         Prev
//       </button>
//       <span>
//         Page {page} of {data?.length}
//       </span>
//       <button
//         disabled={data!.length < 2}
//         onClick={() => setPage((prev) => prev + 1)}
//       >
//         Next
//       </button>
//     </>
//   );
// };

// export default Paginate;
import useLoadMore from "../hooks/useLoadMore";

const Paginate = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useLoadMore();

  if (isLoading) return <h1>Loading...</h1>;
  const allUsers = data?.pages.flatMap((page) => page);
  console.log(hasNextPage);

  if (isError) return <h1>{error.message}</h1>;

  return (
    <div>
      {allUsers?.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Paginate;
