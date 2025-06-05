import { Button, styled, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";

const LibraryTitle = styled("h1")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: "bold",
    padding: "8px", 
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    margin: 0, 
    fontSize: "1rem", 
}));


const TitleArea = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "20px",
});

const LibraryHeader = () => {
    return (
        <LibraryTitle>
            <TitleArea>
                <BookmarkIcon />
                <Typography variant="h2" fontWeight={700}>
                    Your Library
                </Typography>
            </TitleArea>
            <Button variant="text" color="primary">
                <AddIcon />
            </Button>
        </LibraryTitle>
    );
};

export default LibraryHeader;