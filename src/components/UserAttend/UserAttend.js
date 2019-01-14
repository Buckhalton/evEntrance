import React, { Component } from 'react';
import { connect } from 'react-redux';




class UserAttend extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'USER_ATTEND', payload: {code: this.props.match.params.id}});
  }

  render() {
    return (
      <div>
        <div>
          <h1>This visitor has been marked as an attendee!</h1>
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