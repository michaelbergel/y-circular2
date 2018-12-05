This is a minimum viable product (MVP) application for a startup called Y Circular, based here in New Haven.
The company aims to create a marketplace, connecting users looking to rent stuff from other users who
are looking to offer such stuff. Thus far, Y Circular has operated exclusively on Facebook and Instagram.
Our final product will help the company launch officially into autonomous operation. It will also help
them test their MVP in the local market.

Project by:
Bella Steiner (MBA School of Management, MPH School of Public Health)
Michael Bergel (MBA School of Management)


# Files

* `app.js` - This file creates and exports the express application (http://expressjs.com/).
   It also defines all the GET and POST routes and their respective Javascript function names.
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
But to see our final product, already deployed on Heroku, just head to `http://www.ycircular.co/` (no need to run from IDE).

From index.html, the user will be introduced to the overall idea of this website/MVP. Every user can perform one of two actions:
he/she can either add a listing of an object they desire to rent out and/or they may browse through the listings and request to rent an item.

As the user clicks on "share an item", the GET request will render the form.html and the POST request will invoke the function formSubmit once the user fills out the form
and submits the information. This function updates a csv file with the listing's information.
This function also renders a GET request to item_details.htm and invokes the function itemDetails. This function is invoked everytime a listing
is clicked on, so it can iterate thorugh the csv file and take all the information based on the ID of the item. This information is displayed on
item_details.html.

If the user wants to browse through the listings, they would click on "rent an item", whose GET request would invoke the index function and render index.html.
This function iterates through each listing on the csv to populate index.html. As the user clicks on any listing the procedure follows as detailed above.
Finally, if the user decides to rent the item, they will click on "rent this item", which would reder the rent.htm and invoke the function rentSubmit when submited.
This function gathers the information from the form and updates another csv that contains the infomration from all users who have rented stuff.

