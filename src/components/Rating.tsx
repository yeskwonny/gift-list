import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
// !Todo

// onchange
// make it reusable
// save the num of hearts

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function CustomizedRating({
  value,
  onChange,
  max,
}: RatingProps) {
  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Typography component="legend">Priority</Typography>
      <StyledRating
        value={value}
        name="priotity"
        defaultValue={0}
        max={max}
        getLabelText={(value: number) => {
          if (value === 3) return "Must have";
          if (value === 2) return "Really want";
          return "Nice to have";
        }}
        precision={1}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={(_, newValue) => {
          if (newValue !== null) onChange(newValue);
        }}
      />
    </Box>
  );
}
