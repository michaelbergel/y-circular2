This is a minimum viable product application for a startup called Y Circular.
The company aims to create a marketplace to connect users looking to rent stuff (literally) out
with users offering such stuff (literally).

Project by: Bella Steiner (MBA at the School of Management) and Michael Bergel (MBA at the School of Management)



* `app.js` - This file creates the [express](http://expressjs.com/)
  application and exports it.
* `server.js` - this is the server code. The server runs the
  application created in `app.js`. We seperatde the "server" from the
  "app" for testing purposes.
* `index.js` - this file contains our "controllers" or
  "handlers", functions that take an HTTP request and write to the
  HTTP response.
* `views/` - these are the "templates" or "views" for our application.
  These are the HTML files
* `package.json` - this is Node's configuration with all dependencies we used.
  Some dependencies were installed as multiple functions were being tested, but
  not all dependencies are actually needed. Later, the Heroku app will read from
  this file to install the requiired dependencies locally.
* Several other files were used mainly by Node.js or Express. These include, but
  are not limited to: `package-lock.json`,`node_modules/`, `*.test.js`
* `static/` is where we are keeping the CSS.
* `out.csv` - this file contains all the listings. Every time a user posts a new
  listing (by clickin on "share item" and submitting the form), this file is updated with the listing's info
  and later on read from to show contents dynamically on the website.
* `rentees.csv`- this file contains all the users who requested an item from the listing.
  Every time a user rents an item (by clicking on "rent an item" and submitting the form), this file is updated with
  the rentee's info.

## Installing dependencies

To install dependencies on `package.json`, run `npm install`.


## Running the code

To check the application running from the IDE, run `npm start`.
But to see our final product, already deployed on Heroku, just head to `https://ycircular.herokuapp.com/` (no need to run from IDE).
