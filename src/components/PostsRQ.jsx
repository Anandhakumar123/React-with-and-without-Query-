import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsRQ = () => {
  // /posts              ["posts"]
  // /posts/1            ["posts", 1]       // 1 is post.id
  // /posts/2/comments   ["posts", 2, "coments"]

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    enabled: false,
  });

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log({ isLoading, isFetching });

  console.log(data);

  return (
    <div className="post-list">
      <button onClick={refetch}>Fetch posts</button>
      {data?.data.map((post) => (
        <Link to={`/posts-rq/${post.id}`} key={post.id}>
          <div className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;
