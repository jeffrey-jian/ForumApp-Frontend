import {
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRemoveCommentMutation, useEditCommentMutation } from "../store";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Box } from "@mui/system";

function CommentCard({ comment, user }) {
  const [removeComment, removeCommentResults] = useRemoveCommentMutation();
  const [editComment, editCommentResults] = useEditCommentMutation();

  const { id, author_id, author_username, date_created, comment_text } =
    comment;
  const { id: user_id } = user;

  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment_text);
  const [isSecondaryShown, setIsSecondaryShown] = useState(false);

  const removeCommentHandler = () => {
    removeComment(id);
  };
  const editCommentToggleHandler = () => {
    setEditMode(!editMode);
    setEditedComment(comment_text);
  };
  const editCommentChangeHandler = (event) => {
    setEditedComment(event.target.value);
  };
  const submitEditCommentHandler = (event) => {
    event.preventDefault();
    editComment({
      comment_id: id,
      comment_text: editedComment,
    });
  };

  const initial = author_username.slice(0, 1);

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{ bgcolor: editMode ? red[50] : "background.paper" }}
        onMouseEnter = {() =>  setIsSecondaryShown(true)}
        onMouseLeave = {() => setIsSecondaryShown(false)}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: red[500] }} alt={author_username}>
            {initial}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment_text}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.secondary"
                marginRight={"10px"}
              >
                {author_username} &#8212; {date_created}
              </Typography>
            </>
          }
        />
        <ListItemSecondaryAction
          onMouseEnter = {() => setIsSecondaryShown(true)}
          onMouseLeave = {() => setIsSecondaryShown(false)}
          sx={{
            display: ((isSecondaryShown && user_id === author_id ? "block" : "none")),
            margin: "0px",
          }}
        >
          <Stack>
            <IconButton
              onClick={editCommentToggleHandler}
              size="small"
              sx={{ color: grey[500], display: editMode ? "none" : "in-line" }}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={removeCommentHandler}
              size="small"
              sx={{ color: grey[500], display: editMode ? "none" : "in-line" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={editCommentToggleHandler}
              size="small"
              sx={{ color: grey[500], display: editMode ? "in-line" : "none" }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Stack>
        </ListItemSecondaryAction>
      </ListItem>
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
      <Divider variant="inset" component="li" sx={{ width: "90%" }} />
    </>
  );
}

export default CommentCard;
