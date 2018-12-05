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
* `server.js` - this is the server code. The server runs the application created in `app.js`.
   We seperatde the "server" from the "app" for testing purposes.
* `index.js` - this file contains our "controllers" or "handlers",
   functions that take an HTTP request and write to the HTTP response. These functions (modules)
    then get exported and are used in the app.js file to specify which routes are handled
    by which functions.
* `views/` - these are the "templates" or "views" for our application, i.e. the HTML files
*  special attention should be paid to `layout.html` in the views/ folder. This template uses
   nunjucks (the templating language we used for the entire site) to define the general site
   look and feel. Every other html file extends this layout.
* `package.json` - this is Node's configuration with all dependencies we used.
  Some dependencies were installed as multiple functions were being tested, but
  not all dependencies are actually needed. Later, the Heroku app will read from
  this file to install the requiired dependencies locally.
* Several other files were used mainly by Node.js or Express. These include, but
  are not limited to: `package-lock.json` and `node_modules/`
* `static/` is where we keep the main CSS stylesheet and any bootstrap overrides.
* `out.csv` - this file contains all the listings. Every time a user posts a new
  listing (by clicking on "share item" and submitting the form), this file is updated with the listing's info
  and later read from to show contents dynamically on the website, both at the /index and /listing/[id] routes.
* `rentees.csv`- this file contains all the users who rented an item from the listings.
  Every time a user rents an item (by clicking on "rent an item" and submitting the form), this file is updated with
  the rentee's info.

## Installing dependencies

To install dependencies on `package.json`, run `npm install`.


## Running the code

To check the application running from the IDE, run `npm start`.
To see our final product, which has been deployed to Heroku, just head to `http://www.ycircular.co/` (no need to run from IDE).

On the homepage (route /, homepage.html), the user gets introduced to the overall idea of this website/MVP. Every user can perform one
of two actions, for which there are buttons in the top header:
1. add a listing of an object they desire to rent out
2. browse through the listings and request to rent an item

As the user clicks on "share an item", the GET request renders form.html and the POST request invokes the function formSubmit once
the user fills out the form and submits the information. This function updates a csv file with the listing's information.
This function also renders a GET request to item_details.html and invokes the function itemDetails. This function is invoked every time a listing
is clicked on, so it can iterate thorugh the csv file and pull/display all relevant information based on the ID of the item.
This information is displayed on route /listing/[ID#], view item_details.html.

If the user wants to browse through the listings, they click on "rent an item", whose GET request invokes the index function and renders index.html.
This function iterates through each listing on out.csv to populate index.html. As the user clicks on any listing, the procedure follows as detailed
above. Finally, if the user decides to rent the item, they click on "rent this item", which renders rent.html and invokes the function rentSubmit
when submitted. This function gathers the information from the form and updates rentees.csv that contains the infomration from all users who
have rented stuff.

Once the user clicks "submit" on the rental form, the emailConfirm function is invoked and an email gets sent to both renter and rentee with each
other's contact information, asking them to contact each other to arrange pickup/delivery, and also provides Marina's (the business owner) email
address if further help is needed. Subsequently, the user is taken to a page (route /thanks, thanks.html) thanking them for renting.

Thee end!

# FAQs

1. Where is the home button?
   It's the Yellow Y Circular circle in the top left of every screen!

2. Who is Marina Roriz?
   She's the founder of Y Circular. We're making this project as a minimum viable product for her company so that she can go out into the world
   and fly free of the likes of Instagram and Facebook, spread her wings, and soar. Marina joined us at the CS50 Hackathon last week and acted
   as our product manager, running the night using a (very) rough version of the Agile sprint methodology.
