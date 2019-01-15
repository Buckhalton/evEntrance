import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

class UserSettings extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_INFO' });
    }

    render() {
        return (
            <Paper>
                <h1>User Settings</h1>
                <h3>Your Info</h3>
                <p><strong>Name:</strong> {this.props.user.first_name} {this.props.user.last_name}</p>
                <p><strong>Address:</strong> {this.props.user.street_address}</p>
                <p><strong>Phone Number:</strong> {this.props.user.phone_number}</p>
                <p><strong>Email:</strong> {this.props.user.email}</p>
                <div>
                    <Link to="/settings/update"
                        style={{
                            display: 'block',
                            height: '100%',
                            textDecoration: 'none',
                            color: 'black'
                        }}>
                        <Button variant="contained">
                            Update Account
                        </Button>
                    </Link>
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(UserSettings);
