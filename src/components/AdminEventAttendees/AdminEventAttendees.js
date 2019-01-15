import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class AdminEventAttendees extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_EVENT_ATTENDEES', payload: this.props.match.params.id });

    }

    changeAttendance = () => {
        this.props.dispatch({ type: 'SET_ATTENDANCE', payload: this.props.attendeesList, refresh: this.props.match.params.id });
    }

    render() {
        let tableContentOne = this.props.attendeesList.map(row => {
            return (
                <TableRow key={row.id}>
                    <TableCell>
                        {row.first_name} {row.last_name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone_number}</TableCell>
                    <TableCell>{row.street_address}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.attended ? 'Yes' : 'No'}
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => this.changeAttendance(row.id)}
                            style={styles.buttonStyles}>
                            Change
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
        let eventTitle;
        let eventDate;
        if(this.props.attendeesList[0] && this.props.attendeesList[0].event_date){
            eventTitle = this.props.attendeesList[0].event_name;
            eventDate = this.props.attendeesList[0].event_date;
        }
        return (
            <Paper>
                <h3>Event Attendees: {eventTitle} - {eventDate}</h3>
                <Button variant="contained" color="primary">
                    <Link to="/admin/events"
                        style={{
                            display: 'block',
                            height: '100%',
                            textDecoration: 'none',
                            color: 'white'
                        }}>
                        Go Back
                    </Link>
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Attended</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContentOne}
                    </TableBody>
                </Table>
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

const mapStateToProps = state => ({
    attendeesList: state.admin,
    eventId: state.eventId,
});

export default connect(mapStateToProps)(AdminEventAttendees);
