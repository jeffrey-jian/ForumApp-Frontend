import {
  Box,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
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

function NewPost() {
  const [open, setOpen] = useState(false);
  const openHandler = (event) => {
    setOpen(true);
  };
  const closeHandler = (event) => {
    setOpen(false);
  };

  return (
    <>
      <ListItemButton onClick={openHandler}>
        <ListItemIcon>
          <AddIcon fontSize="large"/>
        </ListItemIcon>
        <ListItemText primary="Create a Post" />
      </ListItemButton>
      <StyledModal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <TextField
            required
            fullWidth
            margin="dense"
            label="Title"
            placeholder="Your title here..."
          />
          <TextField
            fullWidth
            margin="dense"
            label="Text (optional)"
            multiline
            minRows={4}
            maxRows={8}
          />
          <Button fullWidth variant="contained" sx={{margin:"10px 0"}}>Post</Button>
        </Box>
      </StyledModal>
    </>
  );
}

export default NewPost;
