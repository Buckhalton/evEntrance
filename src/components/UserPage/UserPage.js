import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import UserEventList from '../UserEventList/UserEventList';

class UserPage extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <div>
          <h1 id="welcome">
            Welcome, {this.props.user.username}!
            </h1>
          <UserEventList />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
