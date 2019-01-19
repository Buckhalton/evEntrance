import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import SnackBar from '../SnackBar/SnackBar';
import swal from 'sweetalert';


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
        open: false,
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
        this.props.dispatch({type: 'CLEAR_REGISTRATION_ERROR'});
    }
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    updateAccount = () => {
        swal({
            title: "Are you sure you want to make these changes?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Your user information has been updated!", {
                icon: "success",
              });
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
                        }
                    });
                } else {
                    this.props.dispatch({ type: 'USER_UPDATE_ACCOUNT_INPUT_ERROR' });
                    return;
                }
            } else {
              swal("Your user information has not been updated!");
            }
          });
            

        this.props.history.push('/settings');
    }

        render() {
            const { classes } = this.props;
            return (
                <div>
                    {this.props.errors.registrationMessage && (
                        <SnackBar state={this.state.open} registerError={this.props.errors.registrationMessage} />
                    )}
                    <Link to="/settings"
                        style={{
                            display: 'block',
                            height: '100%',
                            textDecoration: 'none',
                            color: 'black',
                            marginTop: '15px',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary">
                            Go back
                    </Button>
                    </Link>
                    <form className={classes.paper}>
                        <div className={classes.center}>
                            <h1>Update Account</h1>
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
                                    label="Street Address"
                                    placeholder="Street Address"
                                    margin="normal"
                                    value={this.state.streetAddress}
                                    onChange={this.handleInputChangeFor('streetAddress')}
                                    className={classes.inputStyles}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="City"
                                    placeholder="City"
                                    margin="normal"
                                    value={this.state.city}
                                    onChange={this.handleInputChangeFor('city')}
                                    className={classes.inputStyles}
                                />
                                <TextField
                                    label="State"
                                    placeholder="State"
                                    margin="normal"
                                    value={this.state.state}
                                    onChange={this.handleInputChangeFor('state')}
                                    className={classes.inputStyles}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Username"
                                    placeholder="Username"
                                    margin="normal"
                                    value={this.state.username}
                                    onChange={this.handleInputChangeFor('username')}
                                    className={classes.buttonStyles}
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={this.updateAccount}
                                    color="secondary"
                                    variant="contained"
                                    name="submit"
                                    value="Update"
                                    className={classes.buttonStyles}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }

    const styles = theme => ({
        inputStyles: {
            marginRight: '20px',
            backgroundColor: 'inherit',
            width: '35%',
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
            width: '50%',
            height: '30%',
            padding: '25px',
            marginTop: theme.spacing.unit * 3,
            overflow: 'auto',
            margin: '0 auto',
            marginBottom: '20%',
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
        }
    });

    const mapStateToProps = state => ({
        user: state.user,
        errors: state.errors,
    });

    export default connect(mapStateToProps)(withStyles(styles)(UpdateAccount));
