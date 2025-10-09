import "./App.css";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import PostsRQ from "./components/PostsRQ";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostDetailsRQ from "./components/PostDetailsRQ";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/posts-rq">Posts RQ</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsTraditional />} />
          <Route path="/posts-rq" element={<PostsRQ />} />
          <Route path="/posts-rq/:postId" element={<PostDetailsRQ />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
