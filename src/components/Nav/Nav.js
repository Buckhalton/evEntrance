import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './Nav.css';
import withState from 'recompose/withState';
import toRenderProps from 'recompose/toRenderProps';
import { withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="nav">
        <Link to="/home">
          <h2 className="nav-title">ev<span className={classes.titleSecondary}>Entrance</span><img alt="logo" src="/evEntrance.png" className={classes.img}/></h2>
        </Link>
        <div className="nav-right">
          {this.props.user.id && (
            <Link to="/home"><LogOutButton className={classes.navRight}></LogOutButton></Link>
          )}
          <WithState>
            {({ anchorEl, updateAnchorEl }) => {
              const open = Boolean(anchorEl);
              const handleClose = () => {
                updateAnchorEl(null);
              };
              const { classes } = this.props;
              return (
                <React.Fragment className={classes.menu}>
                  <MenuIcon
                    aria-owns={open ? 'render-props-menu' : undefined}
                    aria-haspopup="true"
                    className={classes.menuButton}
                    onClick={event => {
                      updateAnchorEl(event.currentTarget);
                    }}
                  >

                  </MenuIcon>
                  <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <Link className={classes.menu} to="/home">
                      <MenuItem className={classes.menu} onClick={handleClose}>
                        {/* Show this link if they are logged in or not,
                      but call this link 'Home' if they are logged in,
                      and call this link 'Login / Register' if they are not */}
                        {this.props.user.id ? 'Home' : 'Login / Register'}
                      </MenuItem>
                    </Link>
                    {/* <MenuItem className={classes.menu} onClick={handleClose}> */}
                    {this.props.user.id && (
                      <div>
                        {this.props.user.role_id === 2 && (
                          <div>
                            <Link className={classes.menu} to="/admin/events">
                              <MenuItem className={classes.menu} onClick={handleClose}>
                                Event List
                              </MenuItem>
                            </Link>
                            <Link className={classes.menu} to="/admin/events/add">
                              <MenuItem className={classes.menu} onClick={handleClose}>
                                Add Events
                              </MenuItem>
                            </Link>
                            <Link className={classes.menu} to="/admin/accounts">
                              <MenuItem className={classes.menu} onClick={handleClose}>
                                Manage Accounts
                              </MenuItem>
                            </Link>
                          </div>
                        )}
                        {this.props.user.role_id === 1 && (
                          <Link className={classes.menu} to="/settings">
                            <MenuItem onClick={handleClose}>
                              Account Settings
                            </MenuItem>
                          </Link>
                        )}
                      </div>
                    )}
                    {/* </MenuItem> */}
                    <Link className={classes.menu} to="/about">
                      <MenuItem className={classes.menu} onClick={handleClose}>
                        About
                      </MenuItem>
                    </Link>
                  </Menu>
                </React.Fragment>
              );
            }}
          </WithState>
        </div>
      </div>
    )
  }
}


const styles = theme => ({
  inputStyles: {
    marginRight: '20px',
    backgroundColor: '#edf0f5',
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
    backgroundColor: '#e1e3e7',
    padding: '5%',
    boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',

  },
  header: {
    textAlign: 'center',
    // marginRight: '118px',
  },
  logIn: {
    backgroundColor: '#e1e3e7',
    position: 'relative',
    borderRadius: '20px',
    boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',
  },
  center: {
    margin: '0 auto',
    textAlign: 'center',
  },
  menu: {
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    margin: '0 auto',
    outline: 'none',
    // backgroundColor: '#e1e3e7',
  },
  menuButton: {
    padding: '24px 10px',
    cursor: 'pointer',
    // margin: '10px',
    float: 'right',
  },
  titleSecondary: {
    color: '#e1e3e7',
  },
  navRight: {
    float: 'right',
    color: 'black',
    backgroundColor: '#008183',
    /* background-color: #777777; */
    textAlign: 'center',
    padding: '24px 10px',
    textDecoration: 'none',
    fontSize: '15px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  img: {
    height: '48px',
    width: '48px',
  },
});

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({user});
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Nav));
