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

    render() {
        const { classes } = this.props;
        console.log(this.props.attendeesList);
        let tableContentOne = this.props.attendeesList.map((row, i) => {
            return (
                <TableRow key={row.id}>
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
        if(this.props.attendeesList[0] && this.props.attendeesList[0].event_date){
            eventTitle = this.props.attendeesList[0].event_name;
            eventDate = this.props.attendeesList[0].event_date;
        }
        return (
            <Paper className={classes.paper}>
                <h3>Event Attendees: {eventTitle} - {eventDate}</h3>
                <Link to="/admin/events"
                        style={{
                            display: 'block',
                            height: '100%',
                            textDecoration: 'none',
                            color: 'white'
                        }}>
                    <Button variant="contained" color="primary">
                        Go Back
                    </Button>
                </Link>
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
    attendeesList: state.admin,
    eventId: state.eventId,
});

export default connect(mapStateToProps)(withStyles(styles)(AdminEventAttendees));
