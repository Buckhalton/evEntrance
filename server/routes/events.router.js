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

module.exports = router;