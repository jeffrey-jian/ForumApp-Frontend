import { LoadingButton } from "@mui/lab";
import { InputAdornment, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEditCommentMutation } from "../store";

function CommentEdit(props) {
  
  const {comment, editMode} = props;
  const [editComment, editCommentResults] = useEditCommentMutation();
  const [editedComment, setEditedComment] = useState(comment.comment_text);

  const editCommentChangeHandler = (event) => {
    setEditedComment(event.target.value);
  };
  const submitEditCommentHandler = (event) => {
    event.preventDefault();
    editComment({
      comment_id: comment.id,
      comment_text: editedComment,
    });
  };

  return (
    <Box display={editMode ? "block" : "none"} sx={{ bgcolor: red[50] }}>
        <form onSubmit={submitEditCommentHandler}>
          <TextField
            label="Edit Mode"
            value={editedComment}
            onChange={editCommentChangeHandler}
            sx={{
              width: "95%",
              padding: "10px",
              bgcolor: red[50],
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LoadingButton
                    onClick={submitEditCommentHandler}
                    loading={editCommentResults.isLoading}
                    disabled={editedComment === ""}
                  >
                    <span>EDIT</span>
                  </LoadingButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
  );
}

export default CommentEdit;