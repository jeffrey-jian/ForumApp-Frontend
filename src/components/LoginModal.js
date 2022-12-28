import styled from "@emotion/styled";
import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, logIn } from "../store";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function LoginModal({ openModal, closeModalHandler }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.currentUser.name;
  });
  const usernameChangeHandler = (event) => {
    dispatch(changeUser(event.target.value));
  };
  const isValid = username.length > 0;

  const loginHandler = (event) => {
    dispatch(logIn());
    closeModalHandler();
  };

  return (
    <StyledModal open={openModal} onClose={closeModalHandler}>
      <Box
        width={400}
        height={100}
        bgcolor="white"
        padding={3}
        borderRadius={5}
      >
        <Typography variant="h6" color="primary" textAlign="center">
          Welcome!
        </Typography>
        <form onSubmit={(event) => event.preventDefault()}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems={"center"}>
            <Box flex={4}>
              <TextField
                value={username}
                onChange={usernameChangeHandler}
                label="Username"
                fullWidth
                required
              />
            </Box>
            <Box flex={1}>
              <Button
                onClick={loginHandler}
                disabled={!isValid}
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </StyledModal>
  );
}

export default LoginModal;
