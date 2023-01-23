import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => {
    return {
      user: state.currentUser,
    };
  });

  return (
    <Box>
      <Navbar user={user} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        marginTop="70px"
      >
        <Sidebar user={user} />
        <Feed user={user} />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
