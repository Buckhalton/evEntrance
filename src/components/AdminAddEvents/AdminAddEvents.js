import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';


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
        return (
            <Paper>
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
                        style={styles.inputStyles}
                    />
                    <TextField
                        label=""
                        placeholder="Event Date"
                        type="date"
                        margin="normal"
                        value={this.state.eventDate}
                        onChange={this.handleInputChangeFor('eventDate')}
                        style={styles.inputStyles}
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

const styles = {
    inputStyles: {
        marginRight: '20px',
    },
    buttonStyles: {
        margin: '5px',
    },
}

export default connect()(AdminAddEvents);