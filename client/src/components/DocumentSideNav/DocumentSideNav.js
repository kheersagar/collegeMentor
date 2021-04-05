import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function DocumentSideNav(props) {
  const classes = useStyles();
  const [isMaterial,setIsMaterial] = useState({});

  function material(notes,pdf){
console.log(notes,pdf)
setIsMaterial({notes:notes,pdf:pdf});
  }

  function SubList(){
    return(
      <List>
      { props.subject.value ? Object.values(props.subject.value.data[0].subjects).map((sub)=>{
          return(
            <ListItem button>
          <ListItemText primary={sub.value} onClick={()=>{material(sub.materials.notes,sub.materials.pdf)}}/>
        </ListItem>
      
          )
        }) 
       : null}
      </List>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        {console.log(props)}
          <Paper className={classes.paper}>{props.subject.courseName}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>SUBJECTS</Paper>
          <SubList />
       </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>MATERIALS</Paper>
          {
            isMaterial.pdf ? <iframe src={"http://localhost:8080/"+isMaterial.pdf} width="300" height="300" /> :  null
          }
        </Grid>
      </Grid>
    </div>
  );
}
