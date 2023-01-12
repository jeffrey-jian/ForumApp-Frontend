import { useSelector } from "react-redux";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SubmitIcon from "@mui/icons-material/SendRounded";
import { useAddCommentMutation } from "../store";
import { useState } from "react";

function NewCommentCard({ post_id }) {

  const [comment, setComment] = useState("");

  const [addComment, results] = useAddCommentMutation();

  const { author_id } = useSelector((state) => {
    return {
      author_id: state.currentUser.id,
    };
  });

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    addComment({author_id: author_id, post_id: post_id, comment_text: comment})
    setComment("");
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
