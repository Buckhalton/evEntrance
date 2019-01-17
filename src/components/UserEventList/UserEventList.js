import React, { Component } from 'react'
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import QrCodeComponent from '../QrCodeComponent/QrCodeComponent';


class UserEventList extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'GET_USER_EVENT_LIST' });
    this.props.dispatch({ type: 'GET_USER_UPCOMING_EVENT_LIST' })
  }

  handleChange = (eventId) => {
    let results = this.props.userUpcomingEvents.filter((event) => {
      return event.id === eventId;
    });
    if (results.length === 0) {
      this.props.dispatch({ type: 'POST_USER_UPCOMING_EVENT_LIST', payload: { event: eventId } });
      this.props.dispatch({ type: 'GET_USER_UPCOMING_EVENT_LIST' });
      console.log('dispatch to saga');
    }
  }

  handleDelete = (upcomingEvent) => {
    this.props.dispatch({ type: 'DELETE_USER_UPCOMING_EVENT', payload: upcomingEvent });
  }

  render() {
    const { classes } = this.props;
    let tableContentOne = this.props.eventList.map(row => {
      let radioDisabled = true;
      let results = this.props.userUpcomingEvents.filter((event) => {
        return event.id === row.id;
      });
      if (results.length === 0) {
        radioDisabled = false;
      }
      return (
        <TableRow key={row.id}>
          <TableCell className={classes.table}>
            {row.event_date}
          </TableCell>
          <TableCell className={classes.table}>{row.event_name}</TableCell>
          <TableCell className={classes.table}>
            <Radio
              onChange={() => this.handleChange(row.id)}
              value={row.id}
              name="radio-button-demo"
              aria-label="attend"
              checked={radioDisabled}
            />
          </TableCell>
        </TableRow>
      )
    })

    let tableContentTwo = this.props.userUpcomingEvents.map((row, i) => {
      return (
        
        <TableRow key={row.id}>
          <TableCell className={classes.table}>
            {row.event_date}
          </TableCell>
          <TableCell className={classes.table}>{row.event_name}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleDelete(row.user_events_id)}
            >
              Cancel
            </Button>
          </TableCell>
          <TableCell>
              <QrCodeComponent code={this.props.user.code} eventId={row.id} />          
          </TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        <Paper className={classes.paper}>
          <h3>Your Upcoming Events:</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>When</TableCell>
                <TableCell className={classes.tableHeader}>Event</TableCell>
                <TableCell className={classes.tableHeader}>Cancel?</TableCell>
                <TableCell className={classes.tableHeader}>QR Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContentTwo}
            </TableBody>
          </Table>
        </Paper>
        <Paper className={classes.paper}>
          <h3>Event List:</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>When</TableCell>
                <TableCell className={classes.tableHeader}>Event</TableCell>
                <TableCell className={classes.tableHeader}>Will You Attend?</TableCell>
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
});

const mapStateToProps = state => ({
  eventList: state.eventList,
  user: state.user,
  userUpcomingEvents: state.userUpcomingEvents,
});

export default connect(mapStateToProps)(withStyles(styles)(UserEventList));
