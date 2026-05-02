import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./Pages/CreatePost";
import ViewPosts from "./Pages/ViewPosts";

const App = () => {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/posts" element={<ViewPosts />} />
      </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
