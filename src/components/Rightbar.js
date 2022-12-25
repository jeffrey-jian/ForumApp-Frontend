import { Box } from "@mui/material";

function Rightbar() {
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed">
      </Box>
    </Box>
  );
}

export default Rightbar;
