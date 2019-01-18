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
            <div className={classes.header}>
            <h1>User Settings</h1>
            <Paper className={classes.paper}>
                <div className={classes.center}>
                    <h3>Your Info</h3>
                    <p><strong>Name:</strong> {this.props.user.first_name} {this.props.user.last_name}</p>
                    <p><strong>Address:</strong> {this.props.user.street_address}</p>
                    <p><strong>Phone Number:</strong> {this.props.user.phone_number}</p>
                    <p><strong>Email:</strong> {this.props.user.email}</p>
                </div>
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
        width: '50%',
        height: '30%',
        padding: '25px',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        margin: '0 auto',
        marginBottom: '10%',
        borderRadius: '20px',
        backgroundColor: '#e1e3e7',
        fontSize: '28px',
        boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',

    },
    header: {
        textAlign: 'center',
        fontSize: '18px',
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

export default connect(mapStateToProps)(withStyles(styles)(UserSettings));
