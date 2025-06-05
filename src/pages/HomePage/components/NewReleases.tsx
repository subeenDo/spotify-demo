import React from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; 

import useGetNewRelease from '../../../hooks/useGetNewRelease';
import LoadingSpinner from '../../../common/components/loadingSpinner/loadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewRelease();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid2 xs={6} sm={4} md={2} key={album.id}>
              <Card
                name={album.name}
                artistName={album.artists.map((artist) => artist.name).join(", ")}
                image={album.images[0].url}
              />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
