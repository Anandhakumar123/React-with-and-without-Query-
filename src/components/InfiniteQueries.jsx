import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchFruits = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < 5 && lastPage?.data?.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div>
      {data?.pages?.map((page, pageIndex) =>
        page?.data?.map((fruit) => (
          <div className="fruit-item" key={`${pageIndex}-${fruit.id}`}>
            {fruit.name}
          </div>
        ))
      )}

      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No more"}
        </button>
      </div>
    </div>
  );
};

export default InfiniteQueries;
