import React, { Component } from 'react';
import { connect } from 'react-redux';




class UserAttend extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <h1>You do not have permission to view this page.</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserAttend);