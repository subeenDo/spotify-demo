import React, { useRef, useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlayList';
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  Grid, Typography, Box, TableHead, TableCell, TableRow, Table, TableBody
} from "@mui/material";
import { styled } from '@mui/material/styles';
import DefaultImage from '../../common/components/DefaultImage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from "react-intersection-observer";
import LoadingSpinner from '../../common/components/loadingSpinner/loadingSpinner';

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
  position: "sticky",
  top: 0,
  zIndex: 10,
});

const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const ScrollContainer = styled('div')(({ theme }) => ({
  height: "calc(100dvh - 240px)",
  overflow: "hidden", 
  [theme.breakpoints.down('sm')]: {
    height: "calc(100dvh - 160px)",
  },
}));

const StyledTableContainer = styled('div')({
  height: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const StyledTable = styled(Table)({
  borderCollapse: 'separate',
  borderSpacing: 0,
});

const StyledTableBody = styled(TableBody)({
  display: 'block',
  overflowY: 'auto',
  maxHeight: '100%',
});

const StyledTableRow = styled(TableRow)({
  display: 'table',
  tableLayout: 'fixed',
  width: '100%',
});

function PlayListDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { ref, inView } = useInView();
  const { data: playlist } = useGetPlaylist({ playlist_id: id! });
  const {
    data: playlistItems,
    error : playlistItemsError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id!, limit: PAGE_LIMIT, offset: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && playlistItems?.pages.length === 1) {
      fetchNextPage();
    }
  }, [playlistItems, hasNextPage, isFetchingNextPage, fetchNextPage]);
  

  if (!id) return <Navigate to="/" />;
  if (!playlist) return <div style={{ color: 'white', padding: '16px' }}>Loading...</div>;

  return (
    <div>
      <PlaylistHeader container spacing={7}>
        <ImageGrid item sm={12} md={2}>
          {playlist.images?.[0]?.url ? (
            <AlbumImage src={playlist.images[0].url} alt="playlist_cover" />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid item sm={12} md={10}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist.name}
            </ResponsiveTypography>
            <Box display="flex" alignItems="center">
              <img src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5" width="20px" alt="owner-profile" />
              <Typography variant="subtitle1" color="white" ml={1} fontWeight={700}>
                {playlist.owner?.display_name ?? "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white" ml={1}>
                • {playlist.tracks?.total ?? 0} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
      {playlist ?. tracks?.total === 0 
      ? <Typography>써치</Typography> 
      : <ScrollContainer>
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <StyledTableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </StyledTableRow>
          </TableHead>
          <StyledTableBody>
            {playlistItems?.pages.map((page, pageIndex) =>
              page.items.map((item, itemIndex) => (
                <DesktopPlaylistItem
                  key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  item={item}
                  index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                />
              ))
            )}
            <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>
    </ScrollContainer>
    
    }
      
    </div>
  );
}

export default PlayListDetailPage;
