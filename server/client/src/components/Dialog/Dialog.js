import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (id) => {
    setOpen(false);
    if(id==1){
      props.end();
    }
  };

  return (
    <div>
      <IconButton  onClick={handleClickOpen} >
        <PowerSettingsNewIcon  className="header_right_icon" style={{fontSize:"40px",color:"red"}} />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You sure? You want to Log Out ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handleClose(0)} color="primary">
            No
          </Button>
          <Button onClick={()=>handleClose(1)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
