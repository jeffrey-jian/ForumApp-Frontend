import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import FeedCard from './FeedCard';

function Feed() {
  return (
    <Box bgcolor={grey[100]} flex={4} p={2}>
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </Box>
  );
}

export default Feed;