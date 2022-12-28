import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";

function Feed() {
  const posts = useSelector((state) => {
    return state.posts.posts;
  });
  const feedList =
    posts.length > 0 ? (
      posts.map((item) => <FeedCard key={item.id} item={item} />)
    ) : (
      <p>No posts found!</p>
    );

  return (
    <Box bgcolor={grey[100]} flex={4} p={2}>
      {feedList}
    </Box>
  );
}

export default Feed;
