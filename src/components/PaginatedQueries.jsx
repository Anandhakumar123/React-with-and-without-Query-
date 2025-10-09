import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=12&_page=${pageId}`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,
  });

  console.log("data", data);

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container">
      {data?.data.map((item) => (
        <div className="fruit-label" key={item.id}>
          {item.name}
        </div>
      ))}
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page == 0 ? true : false}
      >
        Prev page
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page == 5 ? true : false}
      >
        Next page
      </button>
    </div>
  );
};

export default PaginatedQueries;
