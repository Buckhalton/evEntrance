import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import {withStyles} from '@material-ui/core';


class AdminManageAccounts extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'GET_ALL_USERS'});
    }

    changeRole = (user) => {
        console.log(user);
        console.log(this.props.user.id, user.id)
        if(user.id === this.props.user.id){
            swal('You cannot alter your own role!');
        } else {
            this.props.dispatch({type: 'CHANGE_USER_ROLE', payload: user});
        }
    }

    deleteUser = (user) => {
        let confirmDelete;
        if(user.id === this.props.user.id){
            swal('You cannot delete your own account!');
        } else {
            confirmDelete = window.confirm(`Are you sure you want to delete "${user.username}"? This user's account will be gone forever!`);
        }
            if(confirmDelete === true){
            this.props.dispatch({type: 'DELETE_USER', payload: user.id});
        }
    }

    getStripedStyle(i) {
        return { backgroundColor: i % 2 ? '#e1e3e7': '#f3f6fc' };
      }

  render() {
      const { classes } = this.props; 
      console.log(this.props.userList);
      let tableContentOne = this.props.userList.map((row, i) => {
          let role;
            if(this.props.userList[i].role_id === 2){
                role = 'Admin';
            } else {
                role = 'Visitor';
            }
        return (
            <TableRow key={i} style={this.getStripedStyle(i)}>
                <TableCell className={classes.table}>
                    {row.first_name} {row.last_name}
                </TableCell>
                <TableCell className={classes.table}>{row.email}</TableCell>
                <TableCell className={classes.table}>{row.phone_number}</TableCell>
                {/* <TableCell>{row.street_address}</TableCell> */}
                <TableCell className={classes.table}>{row.username}</TableCell>
                <TableCell className={classes.table}>{role}
                    <Button
                        onClick={() => this.changeRole(this.props.userList[i])}
                        color="secondary"
                        variant="contained"
                        className={classes.buttonStyles}>
                        Change
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                    onClick={() => this.deleteUser(this.props.userList[i])}
                    color="secondary"
                    variant="contained"
                    className={classes.buttonStyles}>
                        X
                    </Button>
                    </TableCell>
            </TableRow>
        )
    })
    return (
    <Paper className={classes.paper}>
        <h1 style={{ textAlign: 'center' }}>Manage Accounts</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHeader}>Name</TableCell>
                    <TableCell className={classes.tableHeader}>Email</TableCell>
                    <TableCell className={classes.tableHeader}>Phone Number</TableCell>
                    {/* <TableCell>Address</TableCell> */}
                    <TableCell className={classes.tableHeader}>Username</TableCell>
                    <TableCell className={classes.tableHeader}>Role</TableCell>
                    <TableCell className={classes.tableHeader}>Delete</TableCell>
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
    userList: state.userList,
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(AdminManageAccounts));
