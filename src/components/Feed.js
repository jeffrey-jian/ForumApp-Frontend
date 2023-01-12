import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store";
import FeedCard from "./FeedCard";

function Feed() {
  const dispatch = useDispatch();

  const { isLoading, posts, error } = useSelector((state) => {
    return state.posts;
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

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
