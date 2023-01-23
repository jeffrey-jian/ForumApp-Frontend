import styled from "@emotion/styled";
import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterBy, logIn } from "../store";
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
    if (result.isFetching) {
      // do nothing
    } else if (result.isSuccess) {
      if (result.data.payload.data.length !== 0) {
        const { id, username } = result.data.payload.data[0];
        const avatarColor = stringToColour(username);
        dispatch(
          logIn({
            id: id,
            username: username,
            avatarColor: avatarColor,
          })
        );
        closeModalHandler();
        dispatch(filterBy("All"));
      } else {
        alert(`User ${usernameInput} was not registered successfully. Please try again.`);
      }
    }
  }, [result.isFetching]);

  /** stringToColour function below adapted from https://stackoverflow.com/ 
   * questions/3426404/
   * create-a-hexadecimal-colour-based-on-a-string-with-javascript
   */
  const stringToColour = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  const usernameInputChangeHandler = (event) => {
    setUsernameInput(event.target.value);
  };
  const isValid = usernameInput.length > 0;

  const loginHandler = (event) => {
    const avatarColor = stringToColour(usernameInput);
    trigger({ username: usernameInput, avatarColor: avatarColor });
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
