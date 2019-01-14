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



class UserEventList extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_USER_EVENT_LIST'});
    this.props.dispatch({type: 'GET_USER_UPCOMING_EVENT_LIST'})
  }

  handleChange = (eventId) => {
    let results = this.props.userUpcomingEvents.filter((event) => {
      return event.id === eventId;
    });
    if(results.length === 0){
      this.props.dispatch({type: 'POST_USER_UPCOMING_EVENT_LIST', payload: {event: eventId}});
      this.props.dispatch({type: 'GET_USER_UPCOMING_EVENT_LIST'});      
      console.log('dispatch to saga');
    }
  }

    handleDelete = (upcomingEvent) => {
      this.props.dispatch({type: 'DELETE_USER_UPCOMING_EVENT', payload: upcomingEvent});
    }

  render() {
    let tableContentOne = this.props.eventList.map(row => {
      let radioDisabled = true;
      let results = this.props.userUpcomingEvents.filter((event) => {
        return event.id === row.id;
      });
      if(results.length === 0){
        radioDisabled = false;
      }
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.event_date}
                </TableCell>
                <TableCell>{row.event_name}</TableCell>
                <TableCell>
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

    let tableContentTwo = this.props.userUpcomingEvents.map(row => {
      return (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.event_date}
          </TableCell>
          <TableCell>{row.event_name}</TableCell>
          <TableCell>
            <Button 
              variant="contained"
              onClick={() => this.handleDelete(row.user_events_id)}
            >
              Cancel
            </Button>
          </TableCell>
          <TableCell>
            <img alt="user qr code" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://10.100.100.45:5000/api/user/attend/${this.props.user.code}/${row.id}`}/>
          </TableCell>
      </TableRow>
      )
    })

    return (
      <div>
        <Paper>
          <h3>Your Upcoming Events:</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>When</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Cancel?</TableCell>
                <TableCell>QR Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContentTwo}
            </TableBody>
          </Table>
        </Paper>
        <Paper>
          <h3>Event List:</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>When</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Will You Attend?</TableCell>
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

const mapStateToProps = state => ({
  eventList: state.eventList,
  user: state.user,
  userUpcomingEvents: state.userUpcomingEvents,
});

export default connect(mapStateToProps)(UserEventList);
