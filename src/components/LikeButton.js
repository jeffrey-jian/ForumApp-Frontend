import CheckBox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { FormControlLabel } from "@mui/material";
import {
  useAddLikeMutation,
  useFetchLikesByPostQuery,
  useRemoveLikeMutation,
} from "../store";

function LikeButton({ post, user }) {
  const { data, error, isFetching } = useFetchLikesByPostQuery(post.id);
  const [addLike, addLikeResults] = useAddLikeMutation();
  const [removeLike, removeLikeResults] = useRemoveLikeMutation();

  var likeCount;
  var likesData;
  var likedByUserData;
  var likedByUserBool = false;

  if (isFetching) {
    // do nothing
  } else if (error) {
    likeCount = "error";
  } else {
    likesData = data.payload.data;
    likeCount = likesData.length;
    likedByUserData = likesData.find((data) => data.user_id === user.id);
    likedByUserBool = likedByUserData ? true : false;
  }
  const changeHandler = (event) => {
    if (likedByUserBool) {
      // post already liked
      removeLike(likedByUserData);
    } else {
      addLike({ user, post });
    }
  };

  const heartCheckBox = (
    <CheckBox
      checked={likedByUserBool}
      onChange={changeHandler}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite sx={{ color: red[500] }} />}
    />
  );

  return (
    <FormControlLabel
      labelPlacement="start"
      control={heartCheckBox}
      label={likeCount}
    />
  );
}

export default LikeButton;
