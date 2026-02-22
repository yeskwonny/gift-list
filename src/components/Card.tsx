import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import { Chip } from "@mui/material";

interface Props {
  title: string;
  onOpen: () => void;
  onShare?: () => void;
  image?: string;
  description?: string;
  buttonTitle?: string;
  variant?: "vertical" | "horizontal";
  price?: number;
}

const WishlistCard = ({
  title,
  onOpen,
  onShare,
  image,
  description,
  buttonTitle,

  variant = "vertical",
  price,
}: Props) => {
  const isHorizontal = variant === "horizontal";
  console.log("props", buttonTitle);
  return (
    <Card className="">
      <CardActionArea onClick={onOpen}>
        <div className={isHorizontal ? "flex items-stretch" : ""}>
          <CardMedia
            image={image ?? "/default.jpg"}
            className={
              isHorizontal
                ? "w-28 h-28 shrink-0 bg-cover object-contain"
                : "h-28 w-full bg-cover object-contain"
            }
          />

          <CardContent className={isHorizontal ? "flex-1" : ""}>
            <div className="font-main">{title}</div>
            <div className="font-main">{price}</div>
            {description ? (
              <div className="font-main text-sm mt-1">{description}</div>
            ) : null}
          </CardContent>
        </div>
      </CardActionArea>

      <CardActions>
        {onShare ? (
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
          >
            {buttonTitle}
          </Button>
        ) : (
          <Chip
            label={buttonTitle}
            size="small"
            style={{
              padding: "3px 1px",
              backgroundColor: `${buttonTitle === "Available" ? "#A78BFA" : "#F472B6"}`,
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default WishlistCard;
