import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeTitle, changeText } from "../store";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NewPost() {
  const dispatch = useDispatch();

  const { author_id, category, title, text } = useSelector((state) => {
    return {
      author_id: state.currentUser.id,
      category: state.newPost.category,
      title: state.newPost.title,
      text: state.newPost.text,
    };
  });
  const categoryChangeHandler = (event) => {
    dispatch(changeCategory(event.target.value));
  };
  const titleChangeHandler = (event) => {
    dispatch(changeTitle(event.target.value));
  };
  const textChangeHandler = (event) => {
    dispatch(changeText(event.target.value));
  };
  const isValid = category !== "" && title !== "";

  const [open, setOpen] = useState(false);
  const openHandler = (event) => {
    setOpen(true);
  };
  const closeHandler = (event) => {
    setOpen(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();;
    dispatch(changeCategory(""));
    dispatch(changeTitle(""));
    dispatch(changeText(""));
    setOpen(false);
  };

  return (
    <>
      <ListItemButton onClick={openHandler}>
        <ListItemIcon>
          <AddIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary="New Post"
          sx={{ display: { sm: "none", md: "block" } }}
        />
      </ListItemButton>
      <StyledModal open={open} onClose={closeHandler}>
        <Box
          width={500}
          height={400}
          bgcolor="white"
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create a Post
          </Typography>
          <form>
            <FormControl sx={{ minWidth: 120 }} size="small" margin="dense">
              <InputLabel id="category">Category</InputLabel>
              <Select
                fullWidth
                labelId="category"
                value={category}
                label="Category"
                onChange={categoryChangeHandler}
              >
                <MenuItem value="School">School</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Play">Others</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              margin="dense"
              label="Title"
              placeholder="Your title here..."
              value={title}
              onChange={titleChangeHandler}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Text (optional)"
              multiline
              minRows={4}
              maxRows={8}
              value={text}
              onChange={textChangeHandler}
            />
            <Button
              onClick={formSubmitHandler}
              disabled={!isValid}
              fullWidth
              variant="contained"
              sx={{ margin: "10px 0" }}
            >
              Post
            </Button>
          </form>
        </Box>
      </StyledModal>
    </>
  );
}

export default NewPost;
