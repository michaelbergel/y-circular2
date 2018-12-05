# Files

* `app.js` - This file creates and exports the express application (http://expressjs.com/).
   It also defines all the GET and POST routes and their respective Javascript function names.
* `server.js` - this is the server code. The server runs the application created in `app.js`.
   We seperatde the "server" from the "app" for testing purposes.
* `index.js` - this file contains our "controllers" or "handlers",
   functions that take an HTTP request and write to the HTTP response. These functions (modules)
    then get exported and are used in the app.js file to specify which routes are handled
    by which functions.
* `views/` - these are the "templates" (i.e. "views") for our application, a.k.a. the HTML files
*  `layout.html` - special attention should be paid to this file in the views/ folder. This template uses
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
  and later read from to show contents dynamically on the website, both at the `/index` and `/listing/[id]` routes.
* `rentees.csv`- this file contains all the users who rented an item from the listings.
  Every time a user rents an item (by clicking on "rent an item" and submitting the form), this file is updated with
  the rentee's info.

# Design Decisions

1. Decision to have a CSV data structure and not a database
   Trust us, we tried very hard to implement a database in Heroku! But we realized we were running out of time and building out the
   data structure in CSV was simply more feasible. So that's been our workaround. If you look closely around the code, you'll see
   the ghosts of database code past. We plan to implement a database for Y Circular the week of December 17 when we both have more time.

2. The hideousness of the confirmation email body
   This is because we did not get a chance to figure out templating for email bodies. We spent substantial time getting the
   email code. The time constraint didn't allow us to focus on the design of the body, as we were concerned about the body of the message

3. Some problems with the current code and how we plan to fix them
   a. When a HTML is submitted directly without the GET/POST requests (i.e. when the user simply types in the URL), the function to read the csv
may not be read and the listings will be undefined, showing empty listings to the user.
Fix: the update to SQL will resolve this issue since it won't rely on a function to open and read a csv file

   b. We had to give an option to download the data of listings and rentees. Heroku doesn't offer any access whatsoever to files hosted locally,
so we created a function to download such files through URL accesses. Such accesses are open to anyone with the correct URL address.
Fix: we will implement the login functionanlities and create admin profiles with special access to functions that will perform these actions

   c. There is very little error debugging. If the csv file isn't found, empty or has a different name, the app won't work properly. We didn't
have enough time to code error handler prperly.
Fix: update all HTML files, index.js and app.js with proper error checking functionalities

   d. There is no code to remove or update a listing. Again, we spent a lot of time trying to make it feasible, but have decided to leave it
to when we have the updated version that relies on SQL

   e. There is plenty of room for improvement in terms of the overall design. For instance, we are requiring the user to input the URL for the image
instead of having them upload it. We plan on implementing further bootstrap enhancements once we deploy the SQL version, which will also be better suited
to handle upload of images

