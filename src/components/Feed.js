import { Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { useFetchPostsQuery } from "../store";
import FeedCard from "./FeedCard";

function Feed({ user }) {
  
  const { filter, searchTerm, author, likedBy } = useSelector((state) => {
    return {
      filter: state.feedPosts.filter,
      searchTerm: state.feedPosts.searchTerm,
      author: state.feedPosts.author,
      likedBy: state.feedPosts.likedBy,
    };
  });

  const { data, error, isLoading } = useFetchPostsQuery({
    filter: filter,
    searchTerm: searchTerm,
    author: author,
    likedBy: likedBy,
  });

  console.log("From feed", isLoading, data);
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }
  if (data !== null) {
    const posts = data.payload.data;
    const feedList =
      posts.length > 0 ? (
        posts.map((item) => <FeedCard key={item.id} item={item} user={user} />)
      ) : (
        <p>No posts found!</p>
      );
      return (
        <Box bgcolor={grey[100]} flex={4} p={2}>
          {feedList}
        </Box>
      );
  }

}

export default Feed;
