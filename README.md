This is a minimum viable product (MVP) application for a startup called Y Circular, based here in New Haven.
The company aims to create a marketplace, connecting users looking to rent stuff from other users who
are looking to offer such stuff. Thus far, Y Circular has operated exclusively on Facebook and Instagram.
Our final product will help the company launch officially into autonomous operation. It will also help
them test their MVP in the local market.

Project by:
Bella Steiner (MBA School of Management, MPH School of Public Health)
Michael Bergel (MBA School of Management)

For breakdown of files and what they do, please see DESIGN.md document.


## Installing dependencies

To install dependencies on `package.json`, run `npm install`.


## Running the code

To check the application running from the IDE, run `npm start`.
To see our final product, which has been deployed to Heroku, just head to `http://www.ycircular.co/` (no need to run from IDE).

On the homepage (route `/`, homepage.html), the user gets introduced to the overall idea of this website/MVP. Every user can perform one
of two actions, for which there are buttons in the top header:
1. add a listing of an object they desire to rent out
2. browse through the listings and request to rent an item

As the user clicks on "share an item", the GET request renders form.html and the POST request invokes the function formSubmit once
the user fills out the form and submits the information. This function updates a csv file with the listing's information.
This function also renders a GET request to item_details.html and invokes the function itemDetails. This function is invoked every time a listing
is clicked on, so it can iterate thorugh the csv file and pull/display all relevant information based on the ID of the item.
This information is displayed on route `/listing/[ID#]`, view item_details.html.

If the user wants to browse through the listings, they click on "rent an item", whose GET request invokes the index function and renders index.html.
This function iterates through each listing on out.csv to populate index.html. As the user clicks on any listing, the procedure follows as detailed
above. Finally, if the user decides to rent the item, they click on "rent this item", which renders rent.html and invokes the function rentSubmit
when submitted. This function gathers the information from the form and updates rentees.csv that contains the infomration from all users who
have rented stuff.

Once the user clicks "submit" on the rental form, the emailConfirm function is invoked and an email gets sent to both renter and rentee with each
other's contact information, asking them to contact each other to arrange pickup/delivery, and also provides Marina's (the business owner) email
address if further help is needed. Subsequently, the user is taken to a page (route `/thanks`, thanks.html) thanking them for renting.

Finally, to give Y Circular easy access to their CSV "database" tables, we implemented the `/downloadrentees` and `/downloadlistings` routes
from the live Heroku app, which trigger functions to download the CSVs locally on the administrator's computer.

Thee end!

# FAQs

1. Where is the home button?
   It's the Yellow Y Circular circle in the top left of every screen!

2. Who is Marina Roriz?
   She's the founder of Y Circular. We're making this project as a minimum viable product for her company so that she can go out into the world
   and fly free of the likes of Instagram and Facebook, spread her wings, and soar. Marina joined us at the CS50 Hackathon last week and acted
   as our product manager, running the night using a (very) rough version of the Agile sprint methodology.
