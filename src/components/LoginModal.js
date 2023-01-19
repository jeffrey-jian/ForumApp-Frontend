import styled from "@emotion/styled";
import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, logIn } from "../store";
import { useLazyFetchUserQuery } from "../store/apis/usersApi";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function LoginModal({ openModal, closeModalHandler }) {
  const dispatch = useDispatch();
  const [usernameInput, setUsernameInput] = useState("");

  const [trigger, result, lastPromiseInfo] = useLazyFetchUserQuery();

  useEffect(() => {
    console.log("useEffect running");
    console.log("lastPromiseInfo", lastPromiseInfo);
    console.log("result", result);

    if (result.isFetching) {
      // do nothing
    } else if (result.isSuccess) {
      if (result.data.payload.data.length !== 0) {
        const { id, username } = result.data.payload.data[0];
        dispatch(
          logIn({
            id: id,
            username: username,
          })
        );
        closeModalHandler();
      } else {
        alert(`User ${usernameInput} has not been registered`);
      }
    }
  }, [result.isFetching]);

  // const username = useSelector((state) => {
  //   return state.currentUser.name;
  // });

  const usernameInputChangeHandler = (event) => {
    setUsernameInput(event.target.value);
  };
  const isValid = usernameInput.length > 0;

  const loginHandler = async (event) => {
    console.log("logging in...");
    trigger({ username: usernameInput });
    // dispatch(logIn({
    //   id: result.data.payload.data[0].id,
    //   username: result.data.payload.data[0].username,
    // }))
    // closeModalHandler();
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
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box flex={4}>
              <TextField
                value={usernameInput}
                onChange={usernameInputChangeHandler}
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
