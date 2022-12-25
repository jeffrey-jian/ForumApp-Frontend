import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { red } from "@mui/material/colors";

function FeedCard() {
  return (
    <Card sx={{margin:5}}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        image="https://www.foxandbriar.com/wp-content/uploads/2016/04/Shrimp-and-Chorizo-Paella-6-of-10.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color: red[500]}}/>} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default FeedCard;