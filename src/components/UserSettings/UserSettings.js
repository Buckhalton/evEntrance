import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class UserSettings extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'GET_USER_INFO'});
    }

  render() {
    return (
      <div>
          <h1>User Settings</h1>
          <h3>Your Info</h3>
          <p><strong>Name:</strong> {this.props.user.first_name} {this.props.user.last_name}</p>
          <p><strong>Address:</strong> {this.props.user.street_address}</p>
          <p><strong>Phone Number:</strong> {this.props.user.phone_number}</p>
          <p><strong>Email:</strong> {this.props.user.email}</p>
          <img alt="user qr code" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://10.1.10.16:3000/admin/attend/${this.props.user.code}`}/>
          <div>
            <Button variant="contained">
                <Link to="/settings/update" 
                style={{display: 'block', 
                    height: '100%', 
                    textDecoration: 'none', 
                    color: 'black'}}
                >
                    Update Account
                </Link>
            </Button>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user,
  });

export default connect(mapStateToProps)(UserSettings);
