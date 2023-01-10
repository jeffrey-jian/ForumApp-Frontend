import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

function CommentCard({ comment }) {
  const { author_username, date_created, comment_text } = comment;
  console.log(comment);
  const initial = author_username.slice(0, 1); // TO BE reconfigured
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ bgcolor: "background.paper" }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: red[500]}} alt={author_username}>{initial}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment_text}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
                marginRight={"10px"}
              >
                {author_username}
              </Typography>
              &#8212; {date_created}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ width: "90%" }} />
    </>
  );
}

export default CommentCard;
