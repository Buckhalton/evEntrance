import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AdminMain extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_EVENT_LIST' });
    }
    render() {
        let tableContentOne = this.props.eventList.map(row => {
            return (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                        {row.event_date}
                    </TableCell>
                    <TableCell>{row.event_name}</TableCell>
                </TableRow>
            )
        })
        return (
                <Paper>
                    <h1>Hello Admin</h1>
                    <h3>Upcoming Events:</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>When</TableCell>
                                <TableCell>Event</TableCell>
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

const mapStateToProps = state => ({
    eventList: state.eventList,
});

export default connect(mapStateToProps)(AdminMain);
