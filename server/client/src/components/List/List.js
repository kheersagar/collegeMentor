import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import "./List.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ListDropDown(props) {
  const classes = useStyles();

  return (
    <List className={`${classes.root} ul_search_list`} style={{display:props.searchFieldEmpty ? "block":"none"}}>
    {
      props.value ? props.value.data.userSearchResult ? props.value.data.userSearchResult.map((result,index)=>{     //to check is there any value if not this was showing error
        if(index <3){

        return(
          <>
          <ListItem alignItems="flex-start" key={result._id} className="li_search_list">
        <ListItemAvatar>
          <Avatar alt={result.username.substring(0)} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={result.username}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                E-mail: 
              </Typography>
              {result.email}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
          </>
        )
      }

      }) : null :null
    }
{/* posts */}
{
      props.value ? props.value.data.postsSearchResult ? props.value.data.postsSearchResult.map((result,index)=>{
        if(index <3){

        return(
          <>
          <ListItem alignItems="flex-start" key={result._id} className="li_search_list">
        <ListItemAvatar>
          <Avatar alt={result.Title.substring(0)} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={result.Title.substring(0,15)+".."}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Description:  
              </Typography>
              {result.Description.substring(0,10)}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
          </>
        )
      }

      }) : null :null
    }
    </List>
  );
}
