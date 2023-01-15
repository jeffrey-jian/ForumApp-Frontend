import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import PostModal from "./PostModal";

function NewPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openHandler = (event) => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ListItemButton onClick={openHandler}>
        <ListItemIcon>
          <AddIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary="New"
          sx={{ display: { sm: "none", md: "block" } }}
        />
      </ListItemButton>
      <PostModal
        type="new"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default NewPost;
