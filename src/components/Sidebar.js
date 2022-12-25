import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import NewPost from "./NewPost";

function Sidebar() {
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <NewPost />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
