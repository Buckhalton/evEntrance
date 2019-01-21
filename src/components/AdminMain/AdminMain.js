import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';

class AdminMain extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_EVENT_LIST' });
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
                </TableRow>
            )
        })
        return (
                <Paper className={classes.paper}>
                <div className={classes.header}>
                    <h3>Hello Admin</h3>
                    <h3>Upcoming Events:</h3>
                </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeader}>When</TableCell>
                                <TableCell className={classes.tableHeader}>Event</TableCell>
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
        // marginBottom: '10%',
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

export default connect(mapStateToProps)(withStyles(styles)(AdminMain));
