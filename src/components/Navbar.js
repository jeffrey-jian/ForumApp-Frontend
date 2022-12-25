import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "10px",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{position:"fixed", top:0}}>
      <StyledToolbar>
        <Box sx={{ display: "flex", gap: "5px", alignItems: "bottom" }}>
          <LocalLibraryIcon sx={{ display: { xs: "block", sm: "block" } }} />
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Jeffrey's Forum
          </Typography>
        </Box>

        <Search>
          <InputBase placeholder="search..." />
        </Search>

        <Icons>
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
          <IconButton size="small" onClick={handleClick}>
            <Avatar
              
              sx={{ width: 30, height: 30, bgcolor: deepPurple[500] }}
            >
              J
            </Avatar>
          </IconButton>
        </Icons>
      </StyledToolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <Divider />
        {/* <MenuItem>Settings</MenuItem> */}
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
