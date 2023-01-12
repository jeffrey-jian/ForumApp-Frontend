import { List } from "@mui/material";
import { useFetchCommentsQuery } from "../store";
import CommentCard from "./CommentCard";

function CommentsList({ post_id }) {

  const { data, error, isLoading } = useFetchCommentsQuery(post_id);

  var commentsList;
  if (isLoading) {
    commentsList = <div>Loading comments...</div>
  } else if (error) {
    commentsList = <div>Error loading comments.</div>
  } else {
    commentsList = data.payload.data.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ));
  }

  return (
    <List>
      {commentsList}
    </List>
  )
}

export default CommentsList;