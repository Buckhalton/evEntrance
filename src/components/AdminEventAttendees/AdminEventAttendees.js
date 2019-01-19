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
import { withStyles } from '@material-ui/core';

class AdminEventAttendees extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_EVENT_ATTENDEES', payload: this.props.match.params.id });

    }

    changeAttendance = (id, i) => {
        console.log(this.props.attendeesList[i]);
        this.props.dispatch({ type: 'SET_ATTENDANCE', payload: this.props.attendeesList[i], refresh: this.props.match.params.id });
    }

    getStripedStyle(i) {
        return { backgroundColor: i % 2 ? '#e1e3e7' : '#f3f6fc' };
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.attendeesList);
        let tableContentOne = this.props.attendeesList.map((row, i) => {
            return (
                <TableRow key={i} style={this.getStripedStyle(i)}>
                    <TableCell className={classes.table}>
                        {row.first_name} {row.last_name}
                    </TableCell>
                    <TableCell className={classes.table}>{row.email}</TableCell>
                    <TableCell className={classes.table}>{row.phone_number}</TableCell>
                    <TableCell className={classes.table}>{row.street_address}</TableCell>
                    <TableCell className={classes.table}>{row.username}</TableCell>
                    <TableCell className={classes.table}>{row.attended ? 'Yes' : 'No'}
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => this.changeAttendance(row.id, i)}
                            style={styles.buttonStyles}>
                            Change
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
        let eventTitle;
        let eventDate;
        if (this.props.attendeesList[0] && this.props.attendeesList[0].event_date) {
            eventTitle = this.props.attendeesList[0].event_name;
            eventDate = this.props.attendeesList[0].event_date;
        }
        return (
            <div>
                <Link to="/admin/events"
                    style={{
                        display: 'block',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'white',
                        margin: '10px',
                    }}>
                    <Button variant="contained" color="primary">
                        Go Back
                    </Button>
                </Link>
                <Paper className={classes.paper}>
                    <h3>Event Attendees: {eventTitle} - {eventDate}</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeader}>Name</TableCell>
                                <TableCell className={classes.tableHeader}>Email</TableCell>
                                <TableCell className={classes.tableHeader}>Phone Number</TableCell>
                                <TableCell className={classes.tableHeader}>Address</TableCell>
                                <TableCell className={classes.tableHeader}>Username</TableCell>
                                <TableCell className={classes.tableHeader}>Attended</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableContentOne}
                        </TableBody>
                    </Table>
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
        width: '85%',
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
    attendeesList: state.admin,
    eventId: state.eventId,
});

export default connect(mapStateToProps)(withStyles(styles)(AdminEventAttendees));
