import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from '../ProtectedAdminRoute/ProtectedAdminRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import UserSettings from '../UserSettings/UserSettings';
import UpdateAccount from '../UpdateAccount/UpdateAccount';
import AdminMain from '../AdminMain/AdminMain';
import AdminEvents from '../AdminEvents/AdminEvents';
import AdminAddEvents from '../AdminAddEvents/AdminAddEvents';
import AdminEventAttendees from '../AdminEventAttendees/AdminEventAttendees';
import AdminManageAccounts from '../AdminManageAccounts/AdminManageAccounts';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import MuiThemeProvider from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008183',
    },
    secondary: {
      main: '#f40057',
    },
  },
  typography: {
    useNextVariants: true,
  }
});


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            {/* If the user is an admin, redirect to the admin page.*/}
            {this.props.user.role_id === 2 && (
              <Redirect exact from="/home" to="/admin" />
            )}
            {/* If the user is not an admin, redirect to the home page. */}
            {this.props.user.role_id === 1 && (
              <Redirect exact from="/admin" to="/home" />
            )}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />

            <ProtectedRoute
              exact
              path="/settings"
              component={UserSettings}
            />

            <ProtectedRoute
              exact
              path="/settings/update"
              component={UpdateAccount}
            />

            <ProtectedAdminRoute
              exact
              path="/admin"
              component={AdminMain}
            />

            <ProtectedAdminRoute
              exact
              path="/admin/events"
              component={AdminEvents}
            />

            <ProtectedAdminRoute
              exact
              path="/admin/events/add"
              component={AdminAddEvents}
            />

            <ProtectedAdminRoute
              exact
              path="/admin/event/:id/attendees"
              component={AdminEventAttendees}
            />

            <ProtectedAdminRoute
              exact
              path="/admin/accounts"
              component={AdminManageAccounts}
            />


            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
      </MuiThemeProvider>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps)(App);
