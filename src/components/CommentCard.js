import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Tab, Typography } from "@mui/material";

function CommentCard({ comment }) {
  const { author, date, text } = comment;
  const initial = author.slice(0, 1);
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ bgcolor: 'background.paper' }}>
        <ListItemAvatar>
          <Avatar alt={author}>{initial}</Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={text}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  >
                  {author}
                </Typography>
                <Tab />{date}
              </>
            }
            />
      </ListItem>
      <Divider variant="inset" component="li" sx={{width:"90%"}}/>
    </>

  );
}

export default CommentCard;
