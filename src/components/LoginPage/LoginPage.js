import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Snackbar from '../SnackBar/SnackBar';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    open: false,
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        this.setState({
        open: true,
      })
        setTimeout(() => {
          this.setState({
            open: false,
          });
        }, 6000);
      }

      } // end login
  

  

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.errors.loginMessage && (
          <Snackbar state={this.state.open} error={this.props.errors.loginMessage}/>
        )}
        <form onSubmit={this.login} className={classes.logIn}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                className={classes.inputStyles}
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                className={classes.inputStyles}
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center>
      </div>
    );
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
      display: 'block',
      tableLayout: 'wrap',
      width: '100px',
  },
  tableRow: {
      display: 'flex',
  },
  tableBody: {
      maxHeight: '500px',
      overflow: 'auto',
      display: 'block',
      wordWrap: 'break-word',
  },
  paper: {
      width: '100%',
      height: '30%',
      marginTop: theme.spacing.unit * 3,
      overflow: 'auto',
      margin: '0 auto',
      backgroundColor: '#9fcfa5',
      padding: '5%',
      
    },
    header: {
      textAlign: 'center',
    },
    logIn: {
      backgroundColor: '#00ACB0',
      position: 'relative',
      borderRadius: '20px',
	    boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',
    }
});

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
