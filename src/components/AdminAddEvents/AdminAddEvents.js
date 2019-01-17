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
                        label=""
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
                        style={styles.buttonStyles}>
                        Add Event
                    </Button>
                    <Button variant="contained" 
                        onClick={() => this.props.history.push('/admin/events')}
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
        backgroundColor: '#fff2e2',
    },
    buttonStyles: {
        margin: '5px',
    },
    table: {
        display: 'block',
        tableLayout: 'wrap',
        width: '100px',
    },
    tableRow: {
        display: 'flex',
    },
    tableBody: {
        maxHeight: '500px',
        overflow: 'auto',
        display: 'block',
        wordWrap: 'break-word',
    },
    paper: {
        width: '100%',
        height: '30%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        margin: '0 auto',
        backgroundColor: '#00ACB0',
        padding: '5%',
        
      },
      header: {
        textAlign: 'center',
    },
});

export default connect()(withStyles(styles)(AdminAddEvents));