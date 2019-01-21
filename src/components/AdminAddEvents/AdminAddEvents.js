import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';


class AdminAddEvents extends Component {
    state = {
        eventName: '',
        eventDate: '',
    }

    handleInputChangeFor = propertyName => event => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
    }

    addEvent = () => {
        if (this.state.eventName && this.state.eventDate) {
            this.props.dispatch({ type: 'ADD_EVENT', payload: { event: this.state.eventName, date: this.state.eventDate } });
        }
        setTimeout(() => {
            this.props.history.push('/home');
        }, 2000)
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <h1>Add Events</h1>
                <div>
                    <TextField
                        variant="outlined"
                        label="Event Name"
                        placeholder="Event Name"
                        type="text"
                        margin="normal"
                        value={this.state.eventName}
                        onChange={this.handleInputChangeFor('eventName')}
                        className={classes.inputStyles}
                    />
                    <TextField
                        placeholder="Event Date"
                        type="date"
                        margin="normal"
                        value={this.state.eventDate}
                        onChange={this.handleInputChangeFor('eventDate')}
                        className={classes.inputStyles}
                        variant="outlined"
                    />
                </div>
                <div>
                    <Button
                        onClick={this.addEvent}
                        color="secondary"
                        variant="contained"
                        className={classes.buttonStyles}>
                        Add Event
                    </Button>
                    <Button variant="contained" 
                        className={classes.buttonStyles}
                        onClick={() => this.props.history.push('/admin')}
                        color="primary">
                        Go Back
                    </Button>
                </div>
            </Paper>
        )
    }
}

const styles = theme => ({
    inputStyles: {
      marginRight: '20px',
      backgroundColor: 'inherit',
      width: '65%',

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
        width: '65%',
        height: '30%',
        padding: '25px',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        margin: '0 auto',
        // marginBottom: '10%',
        borderRadius: '20px',
        backgroundColor: '#e1e3e7',
        fontSize: '28px',
        boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',
        textAlign: 'center',
    
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

export default connect()(withStyles(styles)(AdminAddEvents));