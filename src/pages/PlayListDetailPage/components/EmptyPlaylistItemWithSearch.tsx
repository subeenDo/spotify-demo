import {
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    styled,
  } from "@mui/material";
  import React, { useState } from "react";
  import ClearIcon from "@mui/icons-material/Clear";
  
  
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
  
  const EmptyPlaylistItemWithSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
  
    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    };
  
    const handleClear = () => {
      setKeyword("");
    };
  
    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <Typography variant="h1" my={4}>
            Let's find something for your playlist!
            </Typography>
            <TextField
                value={keyword}
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
        </div>
    );
  };
  
  export default EmptyPlaylistItemWithSearch;
  