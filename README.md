# evEntrance

evEntrance is a tool for event organizers to better understand who is attending their events, and the number of people planning on attending their events. It uses QR codes to enhance security, and it improves overall community engagement.

## Built With

React, React-Redux, Redux-Saga, JavaScript, Material-UI, postgreSQL, NodeJS, Express, sweetalert, Numverify API, GoQR API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Clone/fork the repo, npm install, create the database using the queries provided in the databases.sql file, and then npm run client/npm start server.

### Prerequisites

- [Node.js](https://nodejs.org/en/)


### Installing

npm install,
Create the database using the SQL queries provided in the database.sql file.

## Screen Shot
![User View](/public/User%20View.png?raw=true "User Main Page")
![Admin View](/public/Admin%20View.png?raw=true "Admin Main Page")
## Documentation

[Scope](https://docs.google.com/document/d/1papao5eiEuKCPGrj1fqtZ3hOTpFRl4RvxM3eNFDUrqc/edit?usp=sharing)

### Completed Features

- [x] Ability for individuals to create an account.
- [x] Ability for users to view events, and declare which events they plan on attending.
- [x] Ability for users to cancel their attendance.
- [x] Ability for users to edit their account info.
- [x] Ability for users to receive a QR code for each event(to be scanned upon arrival).
- [x] Ability for Admins to add and delete events.
- [x] Ability for Admins to manage and delete accounts.
- [x] Ability for Admins to view event attendees for each event.

### Next Steps

- [ ] Implement Google Calendars API
- [ ] Implement search functionality

## Deployment

npm build
use typical practices when deploying to heroku
[Tutorial](https://medium.com/quick-code/deploying-production-build-of-react-app-to-heroku-2548d8bf6936)

## Authors

* Isaiah Buckhalton
