import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from "../Card/ImgMediaCard";
import axios from 'axios';

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

        <Accordion  onChange={handleChange('panel1')} defaultExpanded={true} style={{backgroundColor:"#67bf4b"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}  style={{fontFamily:'Merriweather',fontWeight:"500",fontSize:"1.2rem"}}>{event.value}</Typography>
            <Typography className={classes.secondaryHeading}>I am a Fresher</Typography>
          </AccordionSummary>
        {/* nested accordion */}
            <Accordion  onChange={handleChange(event.sem1)} expanded={expanded === event.sem1} style={{backgroundColor:"#5ed0e2",margin:"2%"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>{event.sem1}</Typography>
                <Typography className={classes.secondaryHeading}>I am a Fresher</Typography>
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
            <Accordion  onChange={handleChange(event.sem2)} expanded={expanded === event.sem2} style={{backgroundColor:"rgb(168 216 224)",margin:"2%"}} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>{event.sem2}</Typography>
                <Typography className={classes.secondaryHeading}>I am a Fresher</Typography>
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
