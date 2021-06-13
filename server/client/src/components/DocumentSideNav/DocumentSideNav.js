import React, { useEffect, useState } from 'react';
import "./DocumentSideNav.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PDFViewer from 'mgr-pdf-viewer-react';

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
    <div className={`pdf_section {classes.root}`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        {console.log(props)}
          <Paper className={`Submate_section $ {classes.paper}`} style={{color:"#111111",boxShadow:"0 7px 6px -6px #777"}}>{props.subject.courseName? props.subject.courseName :"Click on your subject then get your PDF"}</Paper>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper} style={{boxShadow:"0 7px 6px -6px #777",color:"black"}}>SUBJECTS</Paper>
          <SubList />
       </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper} style={{boxShadow:"0 7px 6px -6px #777",color:"black"}}>MATERIALS</Paper>
          {
            isMaterial.pdf ?<PDFViewer document={{url: `${process.env.REACT_APP_BASE_URL}/${isMaterial.pdf}`}}/>:  null
          }
        </Grid>
        {isMaterial.pdf ? <a href={`${process.env.REACT_APP_HOST}${isMaterial.pdf}`} download="My_File.pdf" target="_blank" className="download"> Download Here </a> : null}
      </Grid>
    </div>
  );
}
