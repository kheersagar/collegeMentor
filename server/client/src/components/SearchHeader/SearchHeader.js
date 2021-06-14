import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CircularProgress from '@material-ui/core/CircularProgress';


import "./SearchHeader.css";
import UserList from '../UserList/UserList';
import { MyContext } from '../../App';
import Feed from '../Feed/Feed';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 'max-width',
    backgroundColor: theme.palette.background.paper,
  },
}));

function SearchHeader(props) {

  console.log(props,"result")
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {alluser,dispatch,result} = useContext(MyContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

    <div className={`search__header__main ${classes.root}`}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="People" icon={<PersonPinIcon />} {...a11yProps(0)} />
          <Tab label="Posts" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Recommendation" icon={<SupervisedUserCircleIcon />} {...a11yProps(2)} />
          <Tab label="New" icon={<SupervisedUserCircleIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  style={{textAlign:"center"}}>
      <div style={{maxHeight:"70vh",overflowY:"scroll"}}>
      { result ? result.data.userSearchResult.map((res)=>{
        return(
          <UserList name={res.username} key={res._id} allDetails={res}/>
        )
      }) : <CircularProgress size={20} thickness={4} color="secondary"/>}

      </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{textAlign:"center"}}>
        <Feed class2="search_feed_class" class3="search_feed_container" keyword='postSearch' value = {props.result && props.result.data.postsSearchResult && props.result.data.postsSearchResult} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </div>
    </>
  )
}

export default SearchHeader;
