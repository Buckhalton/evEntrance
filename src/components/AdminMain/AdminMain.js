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
    render() {
        const { classes } = this.props;
        let tableContentOne = this.props.eventList.map(row => {
            return (
                <TableRow key={row.id}>
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
      fontSize: '20px',
      textAlign: 'center',
    }
  });

const mapStateToProps = state => ({
    eventList: state.eventList,
});

export default connect(mapStateToProps)(withStyles(styles)(AdminMain));
