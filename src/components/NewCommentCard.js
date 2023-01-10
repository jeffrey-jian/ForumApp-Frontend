import { useDispatch, useSelector } from "react-redux";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SubmitIcon from "@mui/icons-material/SendRounded";
import { changeCommentText, addComment } from "../store";

function NewCommentCard({ post_id }) {
  const dispatch = useDispatch();
  const { author_id, comment } = useSelector((state) => {
    return {
      author_id: state.currentUser.id,
      comment: state.newComment.text,
    };
  });

  const commentChangeHandler = (event) => {
    dispatch(changeCommentText(event.target.value));
  };
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      addComment({
        data: {
          post_id,
          author_id,
          date_created: "32 February 2023",
          text: comment,
        },
      })
    );
    dispatch(changeCommentText(""));
  };
  return (
    <Box sx={{ bgcolor: "white" }}>
      <form onSubmit={commentSubmitHandler}>
        <TextField
          placeholder="Your comment here..."
          value={comment}
          onChange={commentChangeHandler}
          sx={{
            width: "95%",
            padding: "10px",
            bgcolor: "background.paper",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={commentSubmitHandler}>
                  <SubmitIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
}

export default NewCommentCard;
