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

class AdminEvents extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_EVENT_LIST_ADMIN' });
    }

    storeEventId = (id) => {
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: {event: id} });
    }

    getStripedStyle(i) {
        return { backgroundColor: i % 2 ? '#e1e3e7': '#f3f6fc' };
      }

    render() {
        const { classes } = this.props;
        let tableContentOne = this.props.eventList.map((row, i) => {
            return (
                <TableRow key={i} style={this.getStripedStyle(i)}>
                    <TableCell className={classes.table}>
                        {row.event_date}
                    </TableCell>
                    <TableCell className={classes.table}>{row.event_name}</TableCell>
                    <TableCell>
                    <Link to={`/admin/event/${row.id}/attendees`}
                                    style={{
                                        display: 'block',
                                        height: '100%',
                                        textDecoration: 'none',
                                        color: 'White'
                                    }}
                                >
                        <Button
                            onClick={() => this.storeEventId(row.id)}
                            color="secondary"
                            variant="contained"
                            style={styles.buttonStyles}>
                            View Attendees
                        </Button>
                    </Link>
                    </TableCell>
                </TableRow>
            )
        })
        return (
            <Paper className={classes.paper}>
                <h1 className={classes.header}>Event List</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader}>When</TableCell>
                            <TableCell className={classes.tableHeader}>Event</TableCell>
                            <TableCell className={classes.tableHeader}>Attendees</TableCell>
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
      backgroundColor: 'inherit',
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
    eventList: state.eventList,
});

export default connect(mapStateToProps)(withStyles(styles)(AdminEvents));
