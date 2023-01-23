import { Container, Divider, List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import NewPost from "./NewPost";
import AllIcon from "@mui/icons-material/Public";
import Favorite from "@mui/icons-material/Favorite";
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PlayIcon from "@mui/icons-material/SportsEsports";
import { useDispatch } from "react-redux";
import { filterBy, myPosts, myLikes } from "../store";
import SidebarItem from "./SidebarItem";

function Sidebar({ user }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = user;

  const filterClickHandler = (event) => {
    dispatch(filterBy(event.currentTarget.id));
  };
  const myPostsClickHandler = (event) => {
    dispatch(myPosts(user.id));
  }
  const myLikesClickHandler = (event) => {
    dispatch(myLikes(user.id));
  }

  return (
    <Box flex={1} p={0} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <List sx={{ display: isLoggedIn ? "block" : "none" }}>
            <ListItem>
              <NewPost />
            </ListItem>
            <SidebarItem id="My Posts" buttonClickHandler={myPostsClickHandler}>
              {<SwitchAccountIcon fontSize="large" />}
            </SidebarItem>
            <SidebarItem id="My Likes" buttonClickHandler={myLikesClickHandler}>
              {<Favorite fontSize="large" />}
            </SidebarItem>
            <Divider variant="middle" />
          </List>
          <SidebarItem id="All" buttonClickHandler={filterClickHandler}>
            {<AllIcon fontSize="large" />}
          </SidebarItem>
          <SidebarItem id="School" buttonClickHandler={filterClickHandler}>
            {<SchoolIcon fontSize="large" />}
          </SidebarItem>
          <SidebarItem id="Work" buttonClickHandler={filterClickHandler}>
            {<WorkIcon fontSize="large" />}
          </SidebarItem>
          <SidebarItem id="Play" buttonClickHandler={filterClickHandler}>
            {<PlayIcon fontSize="large" />}
          </SidebarItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
