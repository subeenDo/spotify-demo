import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlist.Api";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const { data: user } = useGetCurrentUserProfile();
  
    return useMutation({
      mutationFn: (params: CreatePlaylistRequest) => {
        if (user?.id) {
          return createPlaylist(user.id, params);
        }
        return Promise.reject(new Error("user id is not defined"));
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["current-user-playlists"]});
        console.log("Playlist created!");
      },
    });
  };
  

export default useCreatePlaylist;
