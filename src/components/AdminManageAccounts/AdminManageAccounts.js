import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


class AdminManageAccounts extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'GET_ALL_USERS'});
    }

    changeRole = (user) => {
        console.log(user);
        console.log(this.props.user.id, user.id)
        if(user.id === this.props.user.id){
            alert('You cannot alter your own role!');
        } else {
            this.props.dispatch({type: 'CHANGE_USER_ROLE', payload: user});
        }
    }

    deleteUser = (user) => {
        let confirmDelete = window.confirm(`Are you sure you want to delete "${user.username}"? This user's account will be gone forever!`);
        if(user.id === this.props.user.id){
            alert('You cannot delete your own account!');
        } else if(confirmDelete === true){
            this.props.dispatch({type: 'DELETE_USER', payload: user.id});
        }
    }

  render() {
      console.log(this.props.userList);
      let tableContentOne = this.props.userList.map((row, i) => {
          let role;
            if(this.props.userList[i].role_id === 2){
                role = 'Admin';
            } else {
                role = 'Visitor';
            }
        return (
            <TableRow key={row.id}>
                <TableCell>
                    {row.first_name} {row.last_name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone_number}</TableCell>
                {/* <TableCell>{row.street_address}</TableCell> */}
                <TableCell>{row.username}</TableCell>
                <TableCell>{role}
                    <Button
                        onClick={() => this.changeRole(this.props.userList[i])}
                        color="secondary"
                        variant="contained"
                        style={styles.buttonStyles}>
                        Change
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                    onClick={() => this.deleteUser(this.props.userList[i])}
                    color="secondary"
                    variant="contained"
                    style={styles.buttonStyles}>
                        X
                    </Button>
                    </TableCell>
            </TableRow>
        )
    })
    return (
        <Paper>
        <h1 style={{ textAlign: 'center' }}>Manage Accounts</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    {/* <TableCell>Address</TableCell> */}
                    <TableCell>Username</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Delete</TableCell>
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
    userList: state.userList,
    user: state.user,
});

export default connect(mapStateToProps)(AdminManageAccounts);
