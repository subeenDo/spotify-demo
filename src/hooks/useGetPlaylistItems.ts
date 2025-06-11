import { useInfiniteQuery } from "@tanstack/react-query"
import { GetPlaylistItemsRequest } from "../models/playlist"
import { getPlaylistItems } from "../apis/playlist.Api";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
    const { offset, ...restParams } = params; 
  
    return useInfiniteQuery({
      queryKey: ['playlist-items', restParams], 
      queryFn: ({ pageParam }) =>
        getPlaylistItems({ offset: pageParam, ...restParams }),
      initialPageParam: 0,
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
  
export default useGetPlaylistItems;