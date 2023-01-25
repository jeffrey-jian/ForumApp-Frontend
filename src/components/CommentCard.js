import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from "@mui/icons-material/Cancel";
import { useRemoveCommentMutation } from "../store";

import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentEdit from "./CommentEdit";

function CommentCard({ comment, user }) {
  const [removeComment, removeCommentResults] = useRemoveCommentMutation();

  const {
    id,
    author_id,
    author_username,
    author_avatarColor,
    date_created,
    comment_text,
  } = comment;
  const { id: user_id } = user;

  // date in UTC time, +8 hours SG time
  dayjs.extend(relativeTime);
  const formatted_date = date_created ? dayjs(date_created).add(8, 'hour').fromNow() : null;

  const [editMode, setEditMode] = useState(false);
  const [isSecondaryShown, setIsSecondaryShown] = useState(false);

  const removeCommentHandler = () => {
    removeComment(id);
  };
  const editCommentToggleHandler = () => {
    setEditMode(!editMode);
  };

  const initial = author_username.slice(0, 1);

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{ bgcolor: editMode ? red[50] : "background.paper" }}
        onMouseEnter={() => setIsSecondaryShown(true)}
        onMouseLeave={() => setIsSecondaryShown(false)}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: author_avatarColor }} alt={author_username}>
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
                {author_username} &#8212; {formatted_date}
              </Typography>
            </>
          }
        />
        <ListItemSecondaryAction
          onMouseEnter={() => setIsSecondaryShown(true)}
          onMouseLeave={() => setIsSecondaryShown(false)}
          sx={{
            display:
              isSecondaryShown && user_id === author_id ? "block" : "none",
            margin: "0px",
          }}
        >
          <Stack>
            <Tooltip title="Edit Comment" placement="right">
              <IconButton
                onClick={editCommentToggleHandler}
                size="small"
                sx={{
                  color: grey[500],
                  display: editMode ? "none" : "in-line",
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Comment" placement="right">
              <IconButton
                onClick={removeCommentHandler}
                size="small"
                sx={{
                  color: grey[500],
                  display: editMode ? "none" : "in-line",
                }}
              >
                {removeCommentResults.isLoading ? (
                  <HourglassBottomIcon fontSize="small"/>
                ) : (
                  <DeleteIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Cancel Edit" placement="right">
              <IconButton
                onClick={editCommentToggleHandler}
                size="small"
                sx={{
                  color: grey[500],
                  display: editMode ? "in-line" : "none",
                }}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
          </Stack>
        </ListItemSecondaryAction>
      </ListItem>
      <CommentEdit comment={comment} editMode={editMode} />
      <Divider variant="inset" component="li" sx={{ width: "90%" }} />
    </>
  );
}

export default CommentCard;
