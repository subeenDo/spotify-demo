import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Typography } from "@mui/material";

import LoginButton from "../../../common/components/Button/LoginButton";

const LoginRequiredNotice = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100%"
    flexDirection="column"
    textAlign="center"
    sx={{
      padding: 6,
      borderRadius: 4,
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    }}
  >
    <EmojiEmotionsIcon
      sx={{
        fontSize: 60,
        color: "#3ebc6a",
        mb: 2,
      }}
    />
    <Typography variant="h5" fontWeight="bold" mb={3}>
      로그인이 필요합니다
    </Typography>

    <LoginButton />
  </Box>
);

export default LoginRequiredNotice;