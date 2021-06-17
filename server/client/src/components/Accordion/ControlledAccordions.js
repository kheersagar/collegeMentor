import React from 'react';
import "./ControlledAccordion.css"
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from "../Card/ImgMediaCard";
import axios from 'axios';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function subGotClicked(sub,code){
    props.click(sub,code)
  }

  const years=[
    {
    value:"First year",
    Quote_1:"I am a Fresher",
    Quote_2:"I am a Fresher",
    sem1:"First Semester",
    sem2:"Second Semester",
    sem1_subject:[
      {
      sub:"SUBJECTS",
      code:"sem01",
      about:"This is a great craftivity to do for Back to School or to hang up for Open House."
      }],
      sem2_subject:[
        {
        sub:"SUBJECTS",
        code:"sem02",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        }]
    },
      {
    value:"Second year",
    Quote_1:"I am Excited",
    Quote_2:"I am Excited",
    sem1:"Third Semester",
    sem2:"fourth Semester",
    sem1_subject:[
      {
      sub:"CSE",
      code:"cse23",
      about:"Computer science is the operating system for all innovation."
      },
      {
      sub:"CIVIL",
      code:"civil23",
      about:"The best creator next to good is a good civil Engineer."
      },
      {
      sub:"MECH",
      code:"mech23",
      about:"Mechanical Engineering is Not a Degree, it is a Royalty!."
      },
      {
      sub:"META",
      code:"meta23",
      about:"The Journal of Industrial and Engineering Chemistry."
      },
      {
      sub:"EEE",
      code:"eee23",
      about:"KEEP CALM AND LOVE AN ELECTRICAL ENGINEER."
      }],
      sem2_subject:[
        {
          sub:"CSE",
          code:"cse24",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"CIVIL",
          code:"civil24",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"MECH",
          code:"mech24",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"META",
          code:"meta24",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"EEE",
          code:"eee24",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          }]
    },
      {
    value:"Third year",
    Quote_1:"I am a Professional",
    Quote_2:"I am a Professional",
    sem1:"Fifth Semester",
    sem2:"Sixth Semester",
    sem1_subject:[
      {
        sub:"CSE",
        code:"cse35",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"CIVIL",
        code:"civil35",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"MECH",
        code:"mech35",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"META",
        code:"meta35",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"EEE",
        code:"eee35",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        }],
      sem2_subject:[
        {
          sub:"CSE",
          code:"cse36",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"CIVIL",
          code:"civil36",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"MECH",
          code:"mech36",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"META",
          code:"meta36",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"EEE",
          code:"eee36",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          }]
    },
      {
    value:"Fourth year",
    Quote_1:"Placement",
    Quote_2:"Placement",
    sem1:"Seventh Semester",
    sem2:"Eigth Semester",
    sem1_subject:[
      {
        sub:"CSE",
        code:"cse47",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"CIVIL",
        code:"civil47",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"MECH",
        code:"mech47",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"META",
        code:"meta47",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        },
        {
        sub:"EEE",
        code:"eee47",
        about:"This is a great craftivity to do for Back to School or to hang up for Open House."
        }],
      sem2_subject:[
        {
          sub:"CSE",
          code:"cse48",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"CIVIL",
          code:"civil48",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"MECH",
          code:"mech48",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"META",
          code:"meta48",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          },
          {
          sub:"EEE",
          code:"eee48",
          about:"This is a great craftivity to do for Back to School or to hang up for Open House."
          }]
    },
  ]
  
  return (
    <div className={classes.root}>
    {years.map((event)=>{
      return(
        <>

        <Accordion  onChange={handleChange('panel1')} defaultExpanded={true} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={`Year_section $ {classes.heading}`} style={{fontSize:"1.3rem",fontFamily: "'Padauk', sans-serif"}}>{event.value}</Typography>
            <Typography className={`Fresher_sec $ {classes.secondaryHeading}`} style={{fontSize:"1.1rem",fontFamily: "'Padauk', sans-serif"}}>{/*I am a Fresher*/}</Typography>
          </AccordionSummary>
        {/* nested accordion */}
            <Accordion  onChange={handleChange(event.sem1)} expanded={expanded === event.sem1} style={{backgroundColor:"#EEF0FF",margin:"2%"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading} style={{fontFamily: "'Padauk', sans-serif",fontSize:"1.2rem"}}>{event.sem1}</Typography>
                <Typography className={classes.secondaryHeading} style={{fontFamily: "'Padauk', sans-serif", fontSize:"1.1rem",color:"black"}}>{event.Quote_1}</Typography>
              </AccordionSummary>
                <AccordionDetails>
                        <Grid container item sm={12} spacing={3}>
                        {event.sem1_subject ? event.sem1_subject.map((e)=>{
                          return(
                            <>
                            <Grid item sm={6}>
                            <ImgMediaCard click={subGotClicked} code={e.code} subject={e.sub} about={e.about} img="https://img.jagranjosh.com/imported/images/E/Articles/maths2.jpg"/>
                          </Grid>
                            </>
                          )
                        }) : null}
                    </Grid>
              </AccordionDetails>
            </Accordion>
            {/* second nested accodion */}
            <Accordion  onChange={handleChange(event.sem2)} expanded={expanded === event.sem2} style={{backgroundColor:"#DCE0FD",margin:"2%"}} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading} style={{fontFamily: "'Padauk', sans-serif",fontSize:"1.2rem"}}>{event.sem2}</Typography>
                <Typography className={classes.secondaryHeading}style={{fontFamily: "'Padauk', sans-serif", fontSize:"1.1rem", color:"black"}}>{event.Quote_2}</Typography>
              </AccordionSummary>
                <AccordionDetails>
                  <Grid container item sm={12} spacing={3}>
                  {event.sem2_subject ? event.sem2_subject.map((e)=>{
                          return(
                            <>
                            <Grid item sm={6}>
                            <ImgMediaCard click={subGotClicked} code={e.code} subject={e.sub} about={e.about} img="https://img.jagranjosh.com/imported/images/E/Articles/maths2.jpg"/>
                          </Grid>
                            </>
                          )
                        }) : null}
                  </Grid>
              </AccordionDetails>
            </Accordion>
            {/* nested accordion ends here */}
      </Accordion>

        </>
      )
    })}
    </div>
  );
}
