import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types";

const loadFetch = async (page: number): Promise<User[]> => {
  const res = await axios.get(
    `http://localhost:3000/users?_page=${page}&_limit=3`,
  );
  if (!res.data.length) throw new Error("No more data to load");
  return res.data;
};

const useLoadMore = (): UseInfiniteQueryResult<InfiniteData<User[]>, Error> => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => loadFetch(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 3) return undefined;
      return allPages.length + 1;
    },
  });
};

export default useLoadMore;
