import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Register extends Component {
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
        code: Math.floor(Math.random() * 12),
    };

    verifyNumber = () => {
        this.props.dispatch({type: 'VERIFY_NUMBER', payload: 6127300750});
        if(this.props.numberData.valid){
            this.setState({
                ...this.state,
                phoneNumber: this.props.numberData.number,
            })
        }
        console.log(this.props.numberData);
    }

    registerUser = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'VERIFY_NUMBER', payload: this.state.phoneNumber});
        console.log(this.props.numberData)
        if(this.props.numberData.valid){
            this.setState({
                ...this.state,
                phoneNumber: this.props.numberData.number,
            })
        }
        if (this.state.firstName && this.state.lastName && this.state.email && this.state.phoneNumber && this.state.streetAddress && this.state.city && this.state.state && this.state.username && this.state.password && this.state.confirmPassword) {
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
                this.props.dispatch({ type: 'REGISTRATION_PASSWORD_ERROR' });
            }
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.errors.registrationMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.registrationMessage}
                    </h2>
                )}
                <form onSubmit={this.registerUser}>
                    <h1>Create an Account</h1>
                    <div>
                        <TextField
                            label="First Name"
                            placeholder="First Name"
                            margin="normal"
                            value={this.state.firstName}
                            onChange={this.handleInputChangeFor('firstName')}
                            style={styles.inputStyles}
                        />
                        <TextField
                            label="Last Name"
                            placeholder="Last Name"
                            margin="normal"
                            value={this.state.lastName}
                            onChange={this.handleInputChangeFor('lastName')}
                            style={styles.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            value={this.state.email}
                            onChange={this.handleInputChangeFor('email')}
                            style={styles.inputStyles}
                        />
                        <TextField
                            label="Phone Number"
                            placeholder="Phone Number"
                            margin="normal"
                            value={this.state.phoneNumber}
                            onChange={this.handleInputChangeFor('phoneNumber')}
                            style={styles.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Street Address"
                            placeholder="Street Address"
                            margin="normal"
                            value={this.state.streetAddress}
                            onChange={this.handleInputChangeFor('streetAddress')}
                            style={styles.inputStyles}
                        />
                        <TextField
                            label="City"
                            placeholder="City"
                            margin="normal"
                            value={this.state.city}
                            onChange={this.handleInputChangeFor('city')}
                            style={styles.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="State"
                            placeholder="State"
                            margin="normal"
                            value={this.state.state}
                            onChange={this.handleInputChangeFor('state')}
                            style={styles.inputStyles}
                        />
                        <TextField
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor('username')}
                            style={styles.inputStyles}
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
                            style={styles.inputStyles}
                        />
                        <TextField
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                            margin="normal"
                            value={this.state.confirmPassword}
                            onChange={this.handleInputChangeFor('confirmPassword')}
                            style={styles.inputStyles}
                        />
                    </div>
                    <div>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                            name="submit"
                            value="Register"
                            style={styles.buttonStyles}>
                            Create Account
                        </Button>
                        <Button
                            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                            color="primary"
                            variant="contained"
                            style={styles.buttonStyles}>
                        Already have an account?
                        </Button>
                    </div>
                </form>
                <Button onClick={this.verifyNumber}>Verify</Button>
            </React.Fragment>
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
    errors: state.errors,
    numberData: state.phoneNumber,
});

export default connect(mapStateToProps)(Register);