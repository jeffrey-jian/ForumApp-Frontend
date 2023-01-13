import { Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFetchPostsQuery } from "../store";
import FeedCard from "./FeedCard";

function Feed({ user }) {

  const {data, error, isLoading } = useFetchPostsQuery("all");


  if (isLoading) {
    return <div><CircularProgress /></div>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const posts = data.payload.data;
  const feedList =
    posts.length > 0 ? (
      posts.map((item) => <FeedCard key={item.id} item={item} user={user}/>)
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
