import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import NewPost from "./NewPost";
import AllIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PlayIcon from "@mui/icons-material/SportsEsports";
import { useDispatch } from "react-redux";
import { filterBy } from "../store";

function Sidebar({ user }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = user;

  const buttonClickHandler = (event) => {
    dispatch(filterBy(event.currentTarget.id));
  };

  return (
    <Box flex={1} p={0} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem>
            {isLoggedIn ? <NewPost /> : null}
          </ListItem>
          <Divider variant="middle"/>
          <ListItem>
            <ListItemButton id="all" onClick={buttonClickHandler}>
              <ListItemIcon>
                <AllIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary="All"
                sx={{ display: { sm: "none", md: "block" } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton id="school" onClick={buttonClickHandler}>
              <ListItemIcon>
                <SchoolIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary="School"
                sx={{ display: { sm: "none", md: "block" } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton id="work" onClick={buttonClickHandler}>
              <ListItemIcon>
                <WorkIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary="Work"
                sx={{ display: { sm: "none", md: "block" } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton id="play" onClick={buttonClickHandler}>
              <ListItemIcon>
                <PlayIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary="Play"
                sx={{ display: { sm: "none", md: "block" } }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
