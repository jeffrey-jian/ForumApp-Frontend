import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Typography,
} from "@mui/material";

function CommentCard({ comment }) {
  const { author_id, date_created, text } = comment;
  const initial = author_id; // TO BE reconfigured
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ bgcolor: "background.paper" }}>
        <ListItemAvatar>
          <Avatar alt={author_id}>{initial}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={text}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {author_id}
              </Typography>
              <Tab />
              {date_created}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ width: "90%" }} />
    </>
  );
}

export default CommentCard;
