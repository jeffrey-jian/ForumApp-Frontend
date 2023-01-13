import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  FormLabel,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey, purple, red } from "@mui/material/colors";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import NewCommentCard from "./NewCommentCard";

import CommentsList from "./CommentsList";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function FeedCard({ item, user }) {

  const [expanded, setExpanded] = useState(false);

  const expandClickHandler = () => {
    setExpanded(!expanded);
  };
  const id = item.id;
  const author_username = item.author_username;
  const initial = author_username.slice(0, 1);
  const date_created = item.date_created;
  const title = item.title;
  const text = item.post_text;
  const category = item.category;



  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: purple[500] }}>{initial}</Avatar>}
        title={author_username}
        subheader={category + "\t" + date_created}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FormLabel>10</FormLabel>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: red[500] }} />}
            // onChange=todo
          />
        </IconButton>
        <ExpandMore expand={expanded} onClick={expandClickHandler}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ bgcolor: grey[100] }}
      >
        <List sx={{ margin: "0 5px" }}>
          <CommentsList  post_id={id} user={user} />
          <NewCommentCard post_id={id} user={user}/>
        </List>
      </Collapse>
    </Card>
  );
}

export default FeedCard;
