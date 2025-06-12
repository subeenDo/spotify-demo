import { Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import { createPlaylist } from "../../apis/playlist.Api";
import { getSportifyAuthUrl } from "../../utils/auth";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const PlaylistWrap = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    marginTop: "16px",
    backgroundColor: theme.palette.action.hover,
    padding: "12px",
    borderRadius: "8px",
}));

const EmptyPlaylist = () => {
    const { data: userProfile } = useGetCurrentUserProfile();
    const {mutate : createPlaylist} = useCreatePlaylist()
    const handleCreatePlaylist = () => {
        if (userProfile) {
          createPlaylist({ name: "나의 플레이 리스트" });
        } else {
            getSportifyAuthUrl();
        }
      };
    return (
        <PlaylistWrap>
            <Typography variant="h2" fontWeight={700} color="secondary">
                Create your first playlist
            </Typography>
            <Typography variant="body1" color="secondary">
                It's easy, we'll help you
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    marginTop: "20px",
                    fontWeight: 700,
                }}
                onClick={handleCreatePlaylist}
            >
                Create Playlist
            </Button>
        </PlaylistWrap>
    );
};

export default EmptyPlaylist;