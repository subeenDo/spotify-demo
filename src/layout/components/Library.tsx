import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LoadingSpinner from "../../common/components/loadingSpinner/loadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  //maxHeight: "calc(100vh - 240px)",
  height: "calc(100dvh - 140px)", 
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none", 
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
   const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  
  const {data:user} = useGetCurrentUserProfile();
  useEffect(()=>{
    if(inView && hasNextPage && !isFetchingNextPage){
        fetchNextPage();
    }
  },[inView])

  if(!user) return <EmptyPlaylist />

//   console.log("ddd. ", data)

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  
  return (
    <div>
      {!data ||data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
            {data?.pages.map((page, index) => (
                <Playlist key={index} playlists={page.items} />
            ))}
            <div ref={ref}>{isFetchingNextPage && <LoadingSpinner /> }</div>
            
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;

