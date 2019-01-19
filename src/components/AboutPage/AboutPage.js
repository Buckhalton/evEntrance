import React from 'react';
import Paper from '@material-ui/core/Paper';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <Paper style={styles.paper}>
      <h2>Thanks for using evEntrance!</h2>
      <ul>
        <h3>Technologies Used:</h3>
        <li>React</li>
        <li>JavaScript</li>
        <li>Redux</li>
        <li>Redux-Saga</li>
        <li>NodeJs</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>Material-Ui</li>
        <li>Numverify API</li>
        <li>GoQR API</li>
        <li>Sweetalert</li>
      </ul>
    </Paper>
  </div>
);

const styles = {
  paper: {
        width: '85%',
        height: '30%',
        padding: '25px',
        overflow: 'auto',
        margin: '0 auto',
        marginBottom: '10%',
        borderRadius: '20px',
        backgroundColor: '#e1e3e7',
        fontSize: '28px',
        boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',
        marginTop: '20px',
    
      },
    header: {
      textAlign: 'center',
    },
    logIn: {
      backgroundColor: '#e1e3e7',
      position: 'relative',
      borderRadius: '20px',
      boxShadow: '0px 10px 20px 0px rgba(50, 50, 50, 0.52)',
  }
}

export default (AboutPage);
