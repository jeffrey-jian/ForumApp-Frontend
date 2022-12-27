import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import FeedCard from "./FeedCard";

function Feed({ posts }) {

  const feedList = posts.map( item => <FeedCard key={item.id} item={item} />)

  return (
    <Box bgcolor={grey[100]} flex={4} p={2}>
      {feedList}
    </Box>
  );
}

export default Feed;
