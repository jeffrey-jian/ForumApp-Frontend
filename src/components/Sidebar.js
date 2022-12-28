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

function Sidebar() {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem>
            <NewPost />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
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
            <ListItemButton>
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
            <ListItemButton>
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
            <ListItemButton>
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
