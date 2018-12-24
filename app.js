'use strict';
const bodyParser = require('body-parser');
const express = require('express');


// Load a .env file if it exists. We store our environment
// variables in a .env file. On heroku, you can see the env
// variables with `heroku config`.
require('dotenv').config();

// Configure our "templating engine", which is
// Mozilla's "Nunjucks" in this case.
const nunjucks = require('nunjucks');

// Require the database library that helps us talk to postgres
// var pgp = require('pg-promise')(/*options*/);

const app = express();

// Connect to the database specified by the DATABASE_URL
// environment variable and store it in the app locals
// so that we can access it from all controllers as
// req.app.locals
// https://expressjs.com/en/api.html#app.locals
// app.locals.db = pgp(process.env.DATABASE_URL);
app.use(bodyParser.urlencoded({ extended: true }));

// Import our controllers from their files. Notice how we're
// giving the `require` built-in function the path a file
// locally instead of a dependency that was installed as
// specified in our `package.json` file, like "express".
const indexControllers = require('./controllers/index.js');

// Through this configuration, Nunjucks will "tell"
// our Express app that it is handling the templates,
// so that when we call the `render` function on a
// response object, it will rely on Nunjucks.
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');


// Configure our app to serve "static" assets,
// new_eventlike client-side images, js, and css out of
// a directory called "static".
app.use('/static', express.static('static'));


// Now, attach our "controllers" to our "routes".
app.get('/index', indexControllers.index);
app.get('/', indexControllers.homepage);
app.get('/listing/new', indexControllers.formSubmit);
app.post('/listing/new', indexControllers.formSubmit);
app.get('/rentform/:id', indexControllers.rentSubmit);
app.post('/rentform/:id', indexControllers.rentSubmit);
app.get('/thanks', indexControllers.emailConfirm);
app.post('/thanks', indexControllers.emailConfirm);
// Controller for creating detailed pages
app.get('/listing/:listingID', indexControllers.itemDetails);
app.post('/listing/:listingID', indexControllers.itemDetails);


app.get('/downloadlistings', indexControllers.downloadlistings);
app.get('/downloadrentees', indexControllers.downloadrentees);


module.exports = app;