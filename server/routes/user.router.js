const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const axios = require('axios');


const router = express.Router();

//function to create a uniqiue code for each user
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const rejectNonAdmin = (req, res, next) => {
  // check if logged in
  if (req.user.role_id === 2) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const streetAddress = req.body.streetAddress;
  const city = req.body.city;
  const state = req.body.state;
  
  const queryText = 'INSERT INTO users (username, password, first_name, last_name, email, phone_number, street_address, city, state, authenticated, code, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id';
  pool.query(queryText, [username, password, firstName, lastName, email, phoneNumber, streetAddress, city, state, true, uuidv4(), 1])
    .then(response => {
      res.sendStatus(201);
    })
    .catch((err) => { next(err); });
});



router.get('/num/:id', (req, res) => {
  let id = req.params.id;
  axios.get(`http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_KEY}&number=${id}&country_code=US&format=1`)
  .then(response => {
    res.send(response.data);
    console.log(response.data);
  })
  .catch(error => {
    console.log('Error with phone verification:', error);
    res.sendStatus(500);
  })
})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//Gets user info for the UserSettings page.
router.get('/info', rejectUnauthenticated, (req, res) => {
  let id = req.user.id
  pool.query('SELECT * FROM users WHERE id = $1;', [id])
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    res.sendStatus(500);
    console.log(err);
  })
})


//not RESTful, but it gets the job done. GET instead of PUT, you cannot make put requests directly from the browser.
router.get('/attend/:id/:event', rejectNonAdmin, (req, res) => {
  let code = req.params.id;
  let eventId = req.params.event;
  pool.query('UPDATE user_events SET attended = $1 FROM users WHERE users.id = user_events.users_id AND code = $2 AND user_events.events_id = $3;', [true, code, eventId])
  .then(response => {
    res.sendStatus(201);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})

router.put('/update', rejectUnauthenticated, (req, res) => {
  let username = req.body.username;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let streetAddress = req.body.streetAddress;
  let city = req.body.city;
  let state = req.body.state;
  let id = req.user.id;
  let queryText = 'UPDATE users SET (username, first_name, last_name, email, street_address, city, state) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8;';
  pool.query(queryText, [username, firstName, lastName, email, streetAddress, city, state, id])
  .then(response => {
    res.sendStatus(201);
  })
  .catch(err => {
    res.sendStatus(500);
    console.log(err);
  })
})

router.get('/userList', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT users.id,
    users.first_name, 
    users.last_name, 
    users.email, 
    users.phone_number, 
    users.street_address, 
    users.username, 
    users.role_id FROM users;`;
  pool.query(queryText)
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    res.sendStatus(500);
    console.log(err);
  })
})

router.put('/changeRole', rejectNonAdmin, (req, res) => {
  let user = req.body;
  if(user.role_id === 2){
    pool.query('UPDATE users SET role_id = $1 WHERE id = $2;', [1, user.id])
    .then(response => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  } else {
    pool.query('UPDATE users SET role_id = $1 WHERE id = $2;', [2, user.id])
    .then(response => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  }
})

router.delete('/delete/:id', rejectNonAdmin, (req, res) => {
  let id = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1;', [id])
  .then(response => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(500);
    console.log(err);
  })
})

module.exports = router;
