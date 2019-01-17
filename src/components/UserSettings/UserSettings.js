import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';

class UserSettings extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_INFO' });
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <h1>User Settings</h1>
                <h3>Your Info</h3>
                <p><strong>Name:</strong> {this.props.user.first_name} {this.props.user.last_name}</p>
                <p><strong>Address:</strong> {this.props.user.street_address}</p>
                <p><strong>Phone Number:</strong> {this.props.user.phone_number}</p>
                <p><strong>Email:</strong> {this.props.user.email}</p>
                <div>
                    <Link to="/settings/update"
                        style={{
                            display: 'block',
                            height: '100%',
                            textDecoration: 'none',
                            color: 'black'
                        }}>
                        <Button 
                            color="primary"
                            variant="contained">
                            Update Account
                        </Button>
                    </Link>
                </div>
            </Paper>
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
      fontSize: '22px'
  
    },
  
    header: {
        fontSize: '32px',
        textAlign: 'center',
    }
  });

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(UserSettings));
