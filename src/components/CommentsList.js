import { List, Typography } from "@mui/material";
import { useFetchCommentsQuery } from "../store";
import CommentCard from "./CommentCard";

function CommentsList({ post_id, user }) {
  const { data, error, isFetching } = useFetchCommentsQuery(post_id);

  var commentsList;
  if (isFetching) {
    // do nothing
  } else if (error) {
    commentsList = <div>Error loading comments.</div>;
  } else {

    if (data.payload.data.length === 0) {
      commentsList = <Typography>No comments yet!</Typography>;
    } else {
      commentsList = data.payload.data.map((comment) => (
        <CommentCard key={comment.id} comment={comment} user={user} />
      ));
    }
  }

  return <>{commentsList}</>;
}

export default CommentsList;
