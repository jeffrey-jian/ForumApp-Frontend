import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeHeading,
  changeCategory, 
  changeText,
  changeTitle,
  useAddPostMutation,
} from "../store";

function PostModal({ type, isModalOpen, setIsModalOpen, originalPost }) {
  const dispatch = useDispatch();
  const { author_id, heading, category, title, text } = useSelector((state) => {
    return {
      author_id: state.currentUser.id,
      heading: state.newPost.heading,
      category: state.newPost.category,
      title: state.newPost.title,
      text: state.newPost.text,
    };
  });

  const [addPost, addPostResults] = useAddPostMutation();

  const categoryChangeHandler = (event) => {
    dispatch(changeCategory(event.target.value));
  };
  const titleChangeHandler = (event) => {
    dispatch(changeTitle(event.target.value));
  };
  const textChangeHandler = (event) => {
    dispatch(changeText(event.target.value));
  };
  const editFields = (originalPost) => {
    // console.log(originalPost);
    const og_category = originalPost.category;
    const og_title = originalPost.title;
    const og_text = originalPost.post_text;
    dispatch(changeCategory(og_category));
    dispatch(changeTitle(og_title));
    dispatch(changeText(og_text));
  };
  const resetFields = () => {
    dispatch(changeCategory(""));
    dispatch(changeTitle(""));
    dispatch(changeText(""));
  }
  const isValid = category !== "" && title !== "";
  
  useEffect(() => {
    console.log("Running useEffect");
    switch (type) {
      case "new":
        resetFields();
        dispatch(changeHeading("Create a Post"));
        break;
      case "edit":
        dispatch(changeHeading("Edit Post"));
        editFields(originalPost);
        break;
      default:
        console.warn("Error in PostModal.js: type unknown");
    }
  }, [isModalOpen]);


  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    addPost({
      author_id: author_id,
      category: category,
      title: title,
      post_text: text,
    });
    dispatch(changeCategory(""));
    dispatch(changeTitle(""));
    dispatch(changeText(""));
    setIsModalOpen(false);
  };
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={isModalOpen}
      onClose={closeModalHandler}
    >
      <Box
        width={500}
        height={400}
        bgcolor="white"
        padding={3}
        borderRadius={5}
      >
        <Typography variant="h6" color="gray" textAlign="center" value>
          {heading}
        </Typography>
        <form onSubmit={formSubmitHandler}>
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
              <MenuItem value="Play">Play</MenuItem>
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
          <LoadingButton
            onClick={formSubmitHandler}
            disabled={!isValid}
            loading={addPostResults.isLoading}
            fullWidth
            variant="contained"
            sx={{ margin: "10px 0" }}
          >
            <span>Post</span>
          </LoadingButton>
        </form>
      </Box>
    </Modal>
  );
}

export default PostModal;
