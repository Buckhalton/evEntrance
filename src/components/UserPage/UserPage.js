import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserEventList from '../UserEventList/UserEventList';
import { withStyles } from '@material-ui/core';

class UserPage extends Component {
  componentDidMount() {
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <h1 id="welcome" className={classes.header}>
            Welcome, {this.props.user.username}!
            </h1>
          <UserEventList />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  inputStyles: {
    marginRight: '20px',
    backgroundColor: '#fff2e2',
  },
  buttonStyles: {
    margin: '5px',
  },
  table: {
    fontSize: '16px',
  },
  tableHeader: {
    fontSize: '32px',
  },
  paper: {
    width: '85%',
    height: '30%',
    padding: '25px',
    marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
    margin: '0 auto',
    marginBottom: '10%',
    // backgroundColor: '#9fcfa5',
    backgroundColor: '#00ACB0',
    fontSize: '28px'

  },

  header: {
    margin: '0 auto',
    marginTop: '20px',
    width: '85%'
  }
});

const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage));
