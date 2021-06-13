import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ControlledAccordions from "../Accordion/ControlledAccordions";
import ImgMediaCard from "../Card/ImgMediaCard";
import DocumentSideNav from "../DocumentSideNav/DocumentSideNav";
import "./Category.css";
import axios from 'axios';


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

export default function Category() {
  const classes = useStyles();
  const [isSub,setIsSub] = useState({});
  const [size,setSize] = useState();
  async function change(val,code){
    if(val){
      const semValue = await axios.get(`http://localhost:8080/study/${code}`);
      setIsSub({value:semValue,courseName:val});
    }
  }
  function abc(){
    setSize(window.screen.width)
  }

  useEffect(()=>{
    abc();
  },[])

  window.addEventListener('resize',abc);

  return (
    <div className="category_main">
    <div className={classes.root } >
    <Grid container spacing={2}  >
      <Grid container item xs={12} spacing={4}>
          <Grid item xs={size < 640 ? 12 : 6}>
                <ControlledAccordions click={change}/>
          </Grid>
          <Grid item sm={6}>
        
          {
            isSub  ? 
            <>
            <DocumentSideNav subject={isSub}/>
            
             </>
             :<ImgMediaCard subject={isSub} about="good" img="https://spng.pngfind.com/pngs/s/227-2271743_cartoon-math-pictures-search-result-cliparts-for-cartoon.png"/>
          }
            
          </Grid>
      </Grid>
    </Grid>
  </div>
  </div>
  );
}