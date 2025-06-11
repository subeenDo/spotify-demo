import React from 'react';
import { Episode, PlaylistTrack, Track } from '../../../models/playlist';
import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
  index: number;
}

const HoverableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
  borderBottom: 'none',
}));

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  if (!item.track) return null;

  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  const duration = item.track.duration_ms
    ? formatDuration(item.track.duration_ms)
    : "unknown";

  const addedAt = item.added_at
    ? new Date(item.added_at).toISOString().split("T")[0]
    : "unknown";

  return (
    <HoverableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || 'no name'}</TableCell>
      <TableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCell>
      <TableCell>{addedAt}</TableCell>
      <TableCell>{duration}</TableCell>
    </HoverableRow>
  );
};

export default DesktopPlaylistItem;
