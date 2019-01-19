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
    backgroundColor: '#edf0f5',
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
  tableBody: {
    maxHeight: '500px',
    overflow: 'auto',
    display: 'block',
    wordWrap: 'break-word',
  },
  paper: {
      width: '85%',
      height: '30%',
      padding: '25px',
      marginTop: theme.spacing.unit * 3,
      overflow: 'auto',
      margin: '0 auto',
      marginBottom: '20%',
      borderRadius: '20px',
      backgroundColor: '#e1e3e7',
      fontSize: '28px',
      boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',
  
    },
  header: {
    textAlign: 'center',
  },
  logIn: {
    backgroundColor: '#e1e3e7',
    position: 'relative',
    borderRadius: '20px',
    boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',
  },
  center: {
    margin: '0 auto',
    textAlign: 'center',
  }
});

const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage));
