import { useSelector } from "react-redux";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useAddCommentMutation } from "../store";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

function NewCommentCard({ post_id, user }) {
  const [comment, setComment] = useState("");

  const [addComment, AddCommentResults] = useAddCommentMutation();

  const { author_id } = useSelector((state) => {
    return {
      author_id: state.currentUser.id,
    };
  });
  const isGuestUser = !user.isLoggedIn;

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    addComment({
      author_id: author_id,
      post_id: post_id,
      comment_text: comment,
    });
    setComment("");
  };
  return (
    <Box sx={{ bgcolor: "white" }}>
      <form onSubmit={commentSubmitHandler}>
        <TextField
          placeholder={
            isGuestUser ? "Login to comment!" : "Your comment here..."
          }
          value={comment}
          onChange={commentChangeHandler}
          sx={{
            width: "95%",
            padding: "10px",
            bgcolor: "background.paper",
          }}
          disabled={isGuestUser}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LoadingButton
                  onClick={commentSubmitHandler}
                  loading={AddCommentResults.isLoading}
                  disabled={comment === ""}
                  sx={{ display: isGuestUser ? "none" : "block" }}
                >
                  <span>SUBMIT</span>
                </LoadingButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
}

export default NewCommentCard;
