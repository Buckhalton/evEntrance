import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';



const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  warning: {
    backgroundColor: '#d32f2e',
  },
});

class SimpleSnackbar extends React.Component {

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <SnackbarContent
          className={classes.warning}
          open={this.props.state}
          onClose={this.handleClose}
          message={<span id="message-id">{this.props.registerError}{this.props.error}</span>}
        />
      </div>
    );
  }
}


export default withStyles(styles)(SimpleSnackbar);

