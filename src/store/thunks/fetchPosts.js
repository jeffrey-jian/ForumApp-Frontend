import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const response = await axios.get(`http://localhost:8000/posts`);

  // DEV ONLY!
  await pause(1000);

  return response.data.payload.data;
});

// development purposes only!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchPosts };
