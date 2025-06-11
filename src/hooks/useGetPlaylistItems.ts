import { useInfiniteQuery } from "@tanstack/react-query"
import { GetPlaylistItemsRequest } from "../models/playlist"
import { getPlaylistItems } from "../apis/playlist.Api";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
    return useInfiniteQuery({
        queryKey: ['playlis-items', params],
        queryFn : ({pageParam}) => {
            return getPlaylistItems({offset:pageParam, ...params });

        },
        initialPageParam : 0 ,
        getNextPageParam : (lastPage) => {
            if(lastPage.next){
                const url = new URL(lastPage.next);
                const nextOffest = url.searchParams.get("offset");
                return nextOffest?parseInt(nextOffest) : undefined;
            }
            return undefined;
        },
    })
}

export default useGetPlaylistItems;