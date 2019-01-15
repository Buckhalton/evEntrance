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

class AdminEvents extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_EVENT_LIST' });
    }

    storeEventId = (id) => {
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: {event: id} });
    }

    render() {
        let tableContentOne = this.props.eventList.map(row => {
            return (
                <TableRow key={row.id}>
                    <TableCell>
                        {row.event_date}
                    </TableCell>
                    <TableCell>{row.event_name}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => this.storeEventId(row.id)}
                            color="secondary"
                            variant="contained"
                            style={styles.buttonStyles}>
                                <Link to={`/admin/event/${row.id}/attendees`}
                                    style={{
                                        display: 'block',
                                        height: '100%',
                                        textDecoration: 'none',
                                        color: 'White'
                                    }}
                                >
                                    View Attendees
                                </Link>
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
        return (
            <Paper>
                <h1 style={{ textAlign: 'center' }}>Event List</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>When</TableCell>
                            <TableCell>Event</TableCell>
                            <TableCell>Attendees</TableCell>
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
    eventList: state.eventList,
});

export default connect(mapStateToProps)(AdminEvents);
