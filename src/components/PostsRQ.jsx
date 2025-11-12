import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

//GET method
const fetchposts = () => {
  return axios.get("http://localhost:4000/posts");
};

//POST method
const addPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const PostsRQ = () => {
  // /posts              ["posts"]
  // /posts/1            ["posts", 1]       // 1 is post.id
  // /posts/2/comments   ["posts", 2, "coments"]

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchposts,
  });

  const { mutate } = useMutation({
    mutationFn: addPost,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, body };
    mutate(newPost);
    setTitle("");
    setBody("");
  };

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
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          value={title}
        />
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post body"
          value={body}
        />
        <button type="submit">Post</button>
      </form>
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
