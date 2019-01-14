const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


router.get('/getUserEvents', rejectUnauthenticated, (req, res) => {
    pool.query('SELECT * FROM events')
    .then(response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('error in GET,', err);
        res.sendStatus(500);
    })
});

router.get('/getUpcomingEvents', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT user_events.user_events_id, events.id, events.event_date, events.event_name FROM events 
    JOIN user_events ON events.id = user_events.events_id
    JOIN users ON users.id = user_events.users_id WHERE users.id = $1 ORDER BY user_events.user_events_id ASC;`;
    pool.query(queryText, [req.user.id])
    .then(response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('error in get upcoming,', err);
        res.sendStatus(500);
    })
})


router.post('/postUpcomingEvents', rejectUnauthenticated, (req, res) => {
    let event = req.body.event;
    let user = req.user.id
    let queryText = `INSERT INTO user_events (users_id, events_id, attended) VALUES ($1, $2, $3)`;
    pool.query(queryText, [user, event, false])
    .then(response => {
        res.sendStatus(201)
    })
    .catch(err => {
        console.log('error in upcoming post,', err);
        res.sendStatus(500);
    }) 
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id;
    pool.query('DELETE FROM user_events WHERE user_events_id = $1;', [id])
    .then(response => {
        res.sendStatus(200);
    })
    .catch(err => {
        console.log('error in delete, ', err);
        res.sendStatus(500);
    })
})

router.get('/attendees/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id;
    let queryText = `SELECT users.first_name,
        users.id, 
        users.last_name, 
        users.email, 
        users.phone_number, 
        users.street_address, 
        users.username, 
        user_events.attended,
        user_events.user_events_id,
        events.event_name,
        events.event_date
        FROM user_events
        JOIN users ON user_events.users_id = users.id 
        JOIN events ON user_events.events_id = events.id WHERE events.id = $1;`;
    pool.query(queryText, [id])
    .then(response => {
        res.send(response.rows);
    })
    .catch(err => {
        res.sendStatus(500);
        console.log(err);
    })
})



router.put('/attendee', rejectUnauthenticated, (req, res) => {
    console.log('In router,', req.body);
    console.log('In router,', req.body[0].attended);
    let body = req.body[0];
    let userId = body.id;
    let userEventId = body.user_events_id;
    console.log( 'attended:', body.attended, '!attended:', !body.attended );
    let queryText = `UPDATE user_events SET attended = $1 
    WHERE user_events.users_id = $2 AND user_events.user_events_id = $3;`;
    pool.query(queryText, [!body.attended, userId, userEventId])
    .then(response => {
        res.sendStatus(201);
    })
    .catch(err => {
        res.sendStatus(500);
        console.log(err);
    })
})

module.exports = router;