import { InfiniteData, useInfiniteQuery,  UseInfiniteQueryResult } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlist.Api";
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from "../models/playlist";
  
  const useGetCurrentUserPlaylists = ({
    limit,
    offset,
  }: GetCurrentUserPlaylistRequest): UseInfiniteQueryResult<
    InfiniteData<GetCurrentUserPlaylistResponse>,
    Error
  > => {
    return useInfiniteQuery({
      queryKey: ["current-user-playlists"],
      queryFn: ({ pageParam = offset }) =>
        getCurrentUserPlaylists({ limit, offset: pageParam }),
      initialPageParam: offset,
      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const nextOffset = url.searchParams.get("offset");
          return nextOffset ? parseInt(nextOffset) : undefined;
        }
        return undefined;
      },
    });
  };
  
  export default useGetCurrentUserPlaylists;
  