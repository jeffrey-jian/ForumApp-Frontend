import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Box } from "@mui/system";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { logOut, searchBy } from "../store";
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

function Navbar({ user }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => {
    return state.feedPosts.searchTerm;
  })

  const { isLoggedIn, name: username, avatarColor } = user;

  const initial = isLoggedIn ? username.slice(0, 1) : null;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    isLoggedIn ? setAnchorEl(event.currentTarget) : setOpenModal(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState(false);

  const logOutHandler = (event) => {
    dispatch(logOut());
  };

  const closeModalHandler = (event) => {
    setOpenModal(false);
  };

  const searchTermChangeHandler = (event) => {
    dispatch(searchBy(event.target.value));
  }

  return (
    <>
      <AppBar sx={{ position: "fixed", top: 0 }}>
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
            <InputBase value={searchTerm} onChange={searchTermChangeHandler} fullWidth placeholder="search..." />
          </Search>

          <Button
            onClick={handleClick}
            sx={{ color: "white" }}
            endIcon={
              isLoggedIn ? (
                <Avatar
                  sx={{ width: 30, height: 30, bgcolor: avatarColor }}
                >
                  {initial}
                </Avatar>
              ) : (
                <></>
              )
            }
          >
            {isLoggedIn ? username : "Log In"}
          </Button>
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
          <MenuItem onClick={logOutHandler}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <LoginModal openModal={openModal} closeModalHandler={closeModalHandler} />
    </>
  );
}

export default Navbar;
