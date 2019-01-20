import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SnackBar from '../SnackBar/SnackBar';
import { withStyles } from '@material-ui/core';


class Register extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'CLEAR_REGISTRATION_ERROR'})
    }
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        username: '',
        password: '',
        confirmPassword: '',
        code: '',
        open: false,
    };

    registerUser = (event) => {
        event.preventDefault();
        if(this.state.phoneNumber){
        axios.get(`api/user/num/${this.state.phoneNumber}`).then(response => {
            console.log('this is response', response)
            if (response.data.valid) {
                    if (this.state.firstName &&
                        this.state.lastName &&
                        this.state.email &&
                        this.state.phoneNumber &&
                        this.state.streetAddress &&
                        this.state.city &&
                        this.state.state &&
                        this.state.username &&
                        this.state.password &&
                        this.state.confirmPassword) {
                        if (this.state.password === this.state.confirmPassword) {
                            this.props.dispatch({
                                type: 'REGISTER',
                                payload: {
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName,
                                    email: this.state.email,
                                    phoneNumber: this.state.phoneNumber,
                                    streetAddress: this.state.streetAddress,
                                    city: this.state.city,
                                    state: this.state.state,
                                    username: this.state.username,
                                    password: this.state.password,
                                    code: this.state.code,
                                },
                            });
                        } else {
                            this.props.dispatch({ type: 'REGISTRATION_PASSWORD_ERROR' })
                                this.setState({
                                    open: true,
                                  })
                                    // setTimeout(() => {
                                    //   this.setState({
                                    //     open: false,
                                    //   });
                                    // }, 6000);
                        }
                    } else {
                        this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' })
                        this.setState({
                            open: true,
                          })
                            // setTimeout(() => {
                            //   this.setState({
                            //     open: false,
                            //   });
                            // }, 6000);
                    }
            } else {
                this.props.dispatch({ type: 'REGISTRATION_PHONE_ERROR' })
                this.setState({
                    open: true,
                  })
                    // setTimeout(() => {
                    //   this.setState({
                    //     open: false,
                    //   });
                    // }, 6000);
            }
        })
    } else {
        this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' })
    }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    autofillInputs = () => {
        this.setState({
            firstName: 'John',
            lastName: 'Doe',
            email: 'JohnDoe123@gmail.com',
            phoneNumber: '6127300750',
            streetAddress: '1234 Main Street',
            city: 'Town',
            state: 'MN',
            username: 'JohnDoe123',
            password: '123',
            confirmPassword: '123',
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.props.errors.registrationMessage && (
                    <SnackBar state={this.state.open} registerError={this.props.errors.registrationMessage}/>
                )}
                <form onSubmit={this.registerUser} className={classes.paper}>
                <div className={classes.center}>
                    <h1>Create an Account</h1>
                    <div>
                        <TextField
                            label="First Name"
                            placeholder="First Name"
                            margin="normal"
                            value={this.state.firstName}
                            onChange={this.handleInputChangeFor('firstName')}
                            className={classes.inputStyles}
                        />
                        <TextField
                            label="Last Name"
                            placeholder="Last Name"
                            margin="normal"
                            value={this.state.lastName}
                            onChange={this.handleInputChangeFor('lastName')}
                            className={classes.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            value={this.state.email}
                            onChange={this.handleInputChangeFor('email')}
                            className={classes.inputStyles}
                        />
                        <TextField
                            label="Phone Number"
                            placeholder="Phone Number"
                            margin="normal"
                            value={this.state.phoneNumber}
                            onChange={this.handleInputChangeFor('phoneNumber')}
                            className={classes.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Street Address"
                            placeholder="Street Address"
                            margin="normal"
                            value={this.state.streetAddress}
                            onChange={this.handleInputChangeFor('streetAddress')}
                            className={classes.inputStyles}
                        />
                        <TextField
                            label="City"
                            placeholder="City"
                            margin="normal"
                            value={this.state.city}
                            onChange={this.handleInputChangeFor('city')}
                            className={classes.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="State"
                            placeholder="State"
                            margin="normal"
                            value={this.state.state}
                            onChange={this.handleInputChangeFor('state')}
                            className={classes.inputStyles}
                        />
                        <TextField
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor('username')}
                            className={classes.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            placeholder="Password"
                            type="password"
                            margin="normal"
                            value={this.state.password}
                            onChange={this.handleInputChangeFor('password')}
                            className={classes.inputStyles}
                        />
                        <TextField
                            label="Confirm"
                            placeholder="Confirm"
                            type="password"
                            margin="normal"
                            value={this.state.confirmPassword}
                            onChange={this.handleInputChangeFor('confirmPassword')}
                            className={classes.inputStyles}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={this.registerUser}
                            color="secondary"
                            variant="contained"
                            type="submit"
                            name="submit"
                            value="Register"
                            className={classes.buttonStyles}>
                            Create Account
                        </Button>
                        <Button
                            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                            color="primary"
                            variant="contained"
                            className={classes.buttonStyles}>
                            Already have an account?
                        </Button>
                        <Button
                            disableRipple={true}
                            onClick={() => this.autofillInputs()}
                            color="primary"
                            variant="contained"
                            className={classes.invisibleButton}>
                        </Button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

const styles = theme => ({
    inputStyles: {
      marginRight: '20px',
      backgroundColor: 'inherit',
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
        width: '60%',
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
      textAlign: 'center',
    },
    invisibleButton: {
        backgroundColor: '#e1e3e7',
        color: '#e1e3e7',
        outline: 'none',
        boxShadow: '0px 0px 0px 0px rgba(50, 50, 50, 0.52)',
        '&:hover': {
            backgroundColor: '#e1e3e7',
        }
    },
  });


const mapStateToProps = state => ({
    errors: state.errors,
    numberData: state.phoneNumber,
    userList: state.userList,
});

export default connect(mapStateToProps)(withStyles(styles)(Register));