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
import { grey, purple, red } from "@mui/material/colors";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CommentCard from "./CommentCard";
import NewCommentCard from "./NewCommentCard";


import { useFetchCommentsQuery } from "../store";

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
  const { data, error, isLoading } = useFetchCommentsQuery(item);

  console.log(data ,error, isLoading);

  const [expanded, setExpanded] = useState(false);

  const expandClickHandler = () => {
    setExpanded(!expanded);
  };
  const id = item.id;
  // const initial = item.author_id; // to be reconfigured
  const title = item.title;
  const text = item.post_text;
  const category = item.category;

  var commentsList;
  if (isLoading) {
    commentsList = <div>Loading comments...</div>
  } else if (error) {
    commentsList = <div>Error loading comments.</div>
  } else {
    commentsList = data.payload.data.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ));
  }

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: purple[500] }}>M</Avatar>}
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
