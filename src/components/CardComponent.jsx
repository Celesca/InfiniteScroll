import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Chip } from '@mui/material';
import './CardComponent.css';

export default function CardComponent(props) {
  const {description,url,types,topics,levels} = props
  return (
    <Grid item style={{display: "flex" , marginBottom:50}} xs={3}>

    <Card className="card-component" sx={{ minWidth: 300 , marginLeft:3 , marginRight:3}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <Box sx={{display:"flex"}}>
          {types.map((data,index)=> {
            if (index == types.length - 1) {
              return (<div style={{marginRight:5}} key={index}>{data}</div>)
            }
            else {
              return (<div style={{marginRight:5}} key={index}>{data},</div>)
            }
            
          })}
          </Box>
        </Typography>
        <Typography variant="h5" sx={{fontWeight:"bold"}} className="card-hero-text" component="div">
          {description}
        </Typography>
        
        <Box sx={{display:"flex" , flexWrap:"wrap", flex:1}}>
        {topics.map((data,index)=> {
          return (
            <Chip
            label={data}
            component="a"
            variant="outlined"
            sx={{marginRight: 2, marginTop:1}}
            key={index}
          />
          )
        })}
        </Box>

        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>
        <div className="card-action" style={{marginLeft:5 , marginRight:20 , marginBottom:5 , display:"flex" , justifyContent:"space-between"}}>
        <Button href={url} size="small">Learn More</Button>
        <Button variant="contained" sx={
          {bgcolor:"green"}} size="small">
          {levels[levels.length-1]}
          </Button>
        </div>
      </CardActions>
    </Card>
    </Grid>
  );
}