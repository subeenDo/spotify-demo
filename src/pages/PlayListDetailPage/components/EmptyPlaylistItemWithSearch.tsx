import {   TextField,
  Typography,
  InputAdornment,
  IconButton,
  styled,
  CircularProgress,
  Box, } from '@mui/material'
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useState, useRef } from 'react'
import { SEARCH_TYPE } from '../../../models/search';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import SearchResultList from './SearchResultList';
import { PAGE_LIMIT } from '../../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../../../common/components/loadingSpinner/loadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';

const StyledClearButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  marginRight: 1,
  "&:hover": {
    backgroundColor: "rgba(30, 215, 96, 0.4)",
    "& svg": {
      color: "#1ed760",
    },
  },
  "& svg": {
    transition: "color 0.2s ease",
  },
}));

const SearchlistContainer = styled("div")(({ theme }) => ({
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

const searchStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#121212',
  },
  searchField: {
    width: '100%',
    maxWidth: '600px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#242424',
      borderRadius: '25px',
      height: '48px',
      fontSize: '16px',
      color: 'white',
      '& fieldset': {
        border: '2px solid transparent',
      },
      '&:hover fieldset': {
        border: '2px solid #535353',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #1db954',
      },
      '& input': {
        padding: '12px 16px',
        '&::placeholder': {
          color: '#b3b3b3',
          opacity: 1,
        },
      },
    },
    '& .MuiInputAdornment-root': {
      marginLeft: '12px',
    },
  },
  searchIcon: {
    color: '#b3b3b3',
    fontSize: '24px',
  },
};


const EmptyPlaylistWithSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState<string>("");
  const { ref, inView } = useInView({
    threshold: 0.6,        
  });

  const {
    data,  
    isLoading, 
    error, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage 
  } = useSearchItemsByKeyword({
      q:keyword,
      type:[SEARCH_TYPE.Track],
      limit: PAGE_LIMIT,
      offset: 0
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    console.log({
      inView,
      hasNextPage,
      isFetchingNextPage,
    });
  
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  const handleClear = () => {
    setInputValue('');
    setKeyword('');
  };

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
   
      <div>
          <Box sx={searchStyles.container}>
            <TextField
              value={inputValue}
              onChange={handleSearchKeyword}
              placeholder="Search..."
              fullWidth
              InputProps={{
                endAdornment: keyword && (
                  <InputAdornment position="end">
                    <StyledClearButton onClick={handleClear} edge="end">
                      <ClearIcon />
                    </StyledClearButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <SearchlistContainer>
            {!keyword && (
              <Box sx={{ p: 4, textAlign: 'center', color: '#b3b3b3' }}>
                Search for tracks to get started 🎵
              </Box>
            )}
            {data?.pages.map((item)=>{
              if (!item.tracks) return false
              return <SearchResultList list={item.tracks?.items} keyword={keyword}></SearchResultList>;
            })}
              {!hasNextPage && keyword && (
                <Box sx={{ p: 2, textAlign: 'center', color: '#888' }}>
                  <Typography variant="body1" color="text.secondary">
                    No more results.
                  </Typography>

                </Box>
              )}
            <div ref={ref} style={{ height: '40px' }}>
              {isFetchingNextPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                  <LoadingSpinner />
                </Box>
              )}

            </div>

          </SearchlistContainer>
        </div>
          

  );
};



export default EmptyPlaylistWithSearch