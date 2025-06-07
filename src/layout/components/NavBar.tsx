import React, {useState} from 'react'
import LoginButton from '../../common/components/Button/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  useMediaQuery,
} from "@mui/material";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});


const NavBar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 메뉴 열기: 클릭한 버튼을 anchorEl로 저장
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 메뉴 닫기: anchorEl 초기화
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 로그아웃 
  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
    handleMenuClose();
  };
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
         {userProfile ? (
    <ProfileContainer>
      <IconButton onClick={handleMenuOpen} size="small">
      <Avatar
        src={userProfile.images?.[0]?.url || ""}
        alt={userProfile.display_name || "User Avatar"}
      />
      </IconButton>
      <ProfileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
      </ProfileMenu>
    </ProfileContainer>
  ) : (
    <LoginButton />
  )}
    </Box>
  )
}

export default NavBar