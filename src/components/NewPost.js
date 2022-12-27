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

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NewPost({ onSubmitNewPost }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const openHandler = (event) => {
    setOpen(true);
  };
  const closeHandler = (event) => {
    setOpen(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    onSubmitNewPost({ category, title, text });
    setTitle("");
    setText("");
    setCategory("");
    setOpen(false);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };
  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <ListItemButton onClick={openHandler}>
        <ListItemIcon>
          <AddIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="New Post" sx={{ display: { sm: "none", md: "block" } }}/>
      </ListItemButton>
      <StyledModal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formSubmitHandler}>
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
            <FormControl sx={{ minWidth: 120 }} size="small" margin="dense">
              <InputLabel id="demo-select-small">Category</InputLabel>
              <Select
                fullWidth
                labelId="demo-select-small"
                id="demo-select-small"
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
              fullWidth
              variant="contained"
              sx={{ margin: "10px 0" }}
            >
              Post
            </Button>
          </Box>
        </form>
      </StyledModal>
    </>
  );
}

export default NewPost;
