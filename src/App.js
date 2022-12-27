import { useEffect, useState } from "react";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import { Box, Stack } from "@mui/material";

function App() {
  const [posts, setPosts] = useState([]);

  // for testing purposes
  function populatePosts() {
    const date = (new Date()).toLocaleString(); 
    console.log(date);
    setPosts([
      {
        id: "1",
        author: "Test Author",
        date: Date.now,
        category: "School",
        title: "Title1",
        text: "Text1",
        comments: [
          {
            id: "1",
            author: "Test Author 2",
            date: date,
            text: "This is a comment. The length of this comment is rather short.",
          },
          {
            id: "2",
            author: "Test Author 2",
            date: date,
            text: "This is a comment. The length of this comment is rather long. This is a comment. The length of this comment is rather long.",
          },
        ],
      },
    ]);
  }
  useEffect(populatePosts, []);

  function onSubmitNewPost(obj) {
    const { category, title, text } = obj;
    console.log("Category is:", category);
    console.log("Title is:", title);
    console.log("Text is:", text);
  }

  return (
    <Box>
      <Navbar />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        marginTop="70px"
      >
        <Sidebar onSubmitNewPost={onSubmitNewPost} />
        <Feed posts={posts} />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
