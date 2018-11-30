'use strict';

const bodyParser = require('body-parser');
const express = require('express');


// Configure our "templating engine", which is
// Mozilla's "Nunjucks" in this case.
const nunjucks = require('nunjucks');

const app = express();
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

// Controller for creating detailed pages
app.get('/listing/:listingID', indexControllers.eventDetail);
app.post('/listing/:listingID', indexControllers.eventDetail);

module.exports = app;
