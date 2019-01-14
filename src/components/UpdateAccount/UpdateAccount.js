import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';


class UpdateAccount extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        username: '',
        password: '',
        confirmPassword: '',
    };

    componentDidMount() {
        this.setState({
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,
            email: this.props.user.email,
            streetAddress: this.props.user.street_address,
            city: this.props.user.city,
            state: this.props.user.state,
            username: this.props.user.username,
        })
    }
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    updateAccount = () => {
        if(window.confirm('Are you sure you want to make these changes?')) {
        if (this.state.firstName && 
            this.state.lastName && 
            this.state.email &&                 
            this.state.streetAddress && 
            this.state.city &&                 
            this.state.state && 
            this.state.username) {
                this.props.dispatch({
                type: 'USER_UPDATE_ACCOUNT_INFO',
                payload: {                            
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,                       
                    email: this.state.email,
                    streetAddress: this.state.streetAddress,
                    city: this.state.city,
                    state: this.state.state,
                    username: this.state.username,
                },
                        });
                } else {
                    this.props.dispatch({ type: 'USER_UPDATE_ACCOUNT_INPUT_ERROR' });
                }
                this.props.history.push('/settings');
            } else {
                return;
            }
    }

    render() {
        return (
            <div>
                {this.props.errors.registrationMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.registrationMessage}
                    </h2>
                )}
                <h1>Update Account</h1>
                <Button variant="contained">
                    <Link to="/settings"
                        style={{
                            display: 'block',
                            height: '100%',
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >
                        Go Back
                    </Link>
                </Button>
                <form>
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
                            label="Street Address"
                            placeholder="Street Address"
                            margin="normal"
                            value={this.state.streetAddress}
                            onChange={this.handleInputChangeFor('streetAddress')}
                            style={styles.inputStyles}
                        />
                    </div>
                    <div>
                        <TextField
                            label="City"
                            placeholder="City"
                            margin="normal"
                            value={this.state.city}
                            onChange={this.handleInputChangeFor('city')}
                            style={styles.inputStyles}
                        />
                        <TextField
                            label="State"
                            placeholder="State"
                            margin="normal"
                            value={this.state.state}
                            onChange={this.handleInputChangeFor('state')}
                            style={styles.inputStyles}
                        />
                    </div>
                    <div>
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
                        <Button
                            onClick={this.updateAccount}
                            color="secondary"
                            variant="contained"
                            name="submit"
                            value="Update"
                            style={styles.buttonStyles}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
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
    user: state.user,
    errors: state.errors,
  });

export default connect(mapStateToProps)(UpdateAccount);
