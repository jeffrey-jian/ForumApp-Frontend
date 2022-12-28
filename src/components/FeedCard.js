import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  // CardMedia,
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
// import CommentIcon from '@mui/icons-material/CommentOutlined';
import { grey, red } from "@mui/material/colors";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CommentCard from "./CommentCard";
import NewCommentCard from "./NewCommentCard";

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

function FeedCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const expandClickHandler = () => {
    setExpanded(!expanded);
  };
  const id = item.id;
  const title = item.title;
  const text = item.text;
  const category = item.category;
  const comments = item.comments;

  const commentsList = comments.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
        title={title}
        subheader={category}
      />
      <CardContent>
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
        <List sx={{ margin: "10px" }}>
          {commentsList}
          <NewCommentCard post_id={id}/>
        </List>
      </Collapse>
    </Card>
  );
}

export default FeedCard;
