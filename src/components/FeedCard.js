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
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubmitIcon from "@mui/icons-material/SendRounded";
import { grey, red } from "@mui/material/colors";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CommentCard from "./CommentCard";
import { Box } from "@mui/system";

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
  const [comment, setComment] = useState("");

  const expandClickHandler = () => {
    setExpanded(!expanded);
  };

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Comment:", { comment });
    setComment("");
  };

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
        <ExpandMore
          expand={expanded}
          onClick={expandClickHandler}
          aria-expanded={expanded}
          aria-label="show more"
        >
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
          <Box sx={{ bgcolor: "white" }}>
            <form onSubmit={commentSubmitHandler}>
              <TextField
                placeholder="Your comment here..."
                value={comment}
                onChange={commentChangeHandler}
                sx={{
                  width: "95%",
                  padding: "10px",
                  bgcolor: "background.paper",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={commentSubmitHandler}>
                        <SubmitIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Box>
        </List>
      </Collapse>
    </Card>
  );
}

export default FeedCard;
