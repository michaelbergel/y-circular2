const listingModels = require('../models/listing.js');
const fs = require("fs");
var csv = require('fast-csv');
var fileRows = [];
var num = 0;
var theList = [];



// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    // the code below parses data from out.csv
    // and stores into an array called data

    csv.fromPath('out.csv', {headers: true})
          .on('data', function(data) {
            fileRows.push(data);

            // `data` is an array containing the values
            // of the current line in the file
          })
          .on('end', function() {
            console.log('Parsing awesome!');
            const contextData = {
                title: 'Listings',
                salutation: "Browse all listings and see what you'd like to rent",
                listings: fileRows,
            };
            response.render('index', contextData);
          });
    // csv reading code up goes up to here

    // we need to reset the array or it will keep on increasing forever
    fileRows = [];
}

function homepage(request, response) {
    const contextData = {
        title: 'Welcome!',
        salutation: 'Welcome to Y-Circular!',

    };
    response.render('homepage', contextData);
}

function formSubmit(request, response) {

    // DUE TO ASYNC of the lines below,
    // there was no way to keep it into a function
    // we had to implement it in every function we needed
    // the id for the last listing
        csv.fromPath('out.csv', {headers: true})
          .on('data', function(data) {
            fileRows.push(data);

            // `data` is an array containing the values
            // of the current line in the file
            //console.log(data);
          })
          .on('end', function() {
            console.log('Parsing complete!');
            num = Math.max(...fileRows.map(x => x.id));
            console.log(num);
          });


    // The form data are in `request.body`. We need to get
    // these data out and use them to create a new listing,
    // or return some kind of error to the user if they
    // submitted invalid data.

    // Start with an empty array of errors
    const contextData = {
        title: 'Add listing',
        salutation: 'Please fill out the information below to post your item',
        errors: [],
    };

    if (request.method === 'POST') {
        const errors = [];

        if (!request.body.name || request.body.name.length > 101) {
            errors.push('Please fill out your name');
            // alert('Please fill out your name');
        }

        if (errors.length === 0) {

        // Create a new listing! Find a good id (e.g. max existing id + 1)
            const newListing = {
                name: request.body.name,
                email: request.body.email,
                school: request.body.school,
                class_: request.body.class,
                phone: request.body.phone,
                object: request.body.object,
                price: request.body.price,
                image: request.body.image,
                firstAvail: request.body.firstAvail,
                lastAvail: request.body.lastAvail,
            };
            newListing.id = num + 1;
            // Push it on to our list of all listings
            console.log('The new listing\'s info:', newListing);
            //listingModels.all.push(newListing);

            // write to the csv out.csv
            // trying method 2
            // take the "//" from below if not working
            // var fs = require("fs");
            var csvWriter = require('csv-write-stream');
            if (!fs.existsSync('out.csv')){
                writer = csvWriter({ headers: ["id", "name", "email", "school", "class", "phone", "object", "price", "image", "firstAvail", "lastAvail"]});
                writer.pipe(fs.createWriteStream('out.csv'));
                writer.write([newListing.id, newListing.name, newListing.email, newListing.school, newListing.class_, newListing.phone, newListing.object, newListing.price, newListing.image, newListing.firstAvail, newListing.lastAvail]);
            }
            else{
            writer = csvWriter({sendHeaders: false});

            writer.pipe(fs.createWriteStream('out.csv', {flags: 'a'}));
            writer.write({
                header1:newListing.id,
                header2:newListing.name,
                header3:newListing.email,
                header4:newListing.school,
                header5:newListing.class_,
                header6:newListing.phone,
                header7:newListing.object,
                header8:newListing.price,
                header9:newListing.image,
                header10:newListing.firstAvail,
                header11:newListing.lastAvail,
            });
            }
            writer.end();
            // csv writing ends here





            return response.redirect(`/listing/${newListing.id}`);
        }

        contextData.errors = errors;
    } else {
        console.log('This is a GET request');

    }

    return response.render('form', contextData);
}


function rentSubmit(request, response) {
    // The form data are in `request.body`. We need to get
    // these data out and use them to create a new listing,
    // or return some kind of error to the user if they
    // submitted invalid data.

    // Start with an empty array of errors
    // const listingID = parseInt(request.params.listingID, 10);
    // const theList = listingModels.getById(listingID);
    const contextData = {
        title: 'Rent this Item',
        salutation: 'Please fill out the information below to rent this item',
        errors: [],
    };

    if (request.method === 'POST') {
        const errors = [];

        if (!request.body.name || request.body.name.length > 101) {
            errors.push('Please fill out your name');
            // alert('Please fill out your name');
        }

        if (errors.length === 0) {
            const id = parseInt(request.params.id, 10);
            theList = listingModels.getById(id);
        // Create a new listing! Find a good id (e.g. max existing id + 1)
            const renterInfo = {
                // id: theList.id,
                name: request.body.name,
                email: request.body.email,
                phone: request.body.phone,
                address: request.body.address,
                object: theList.object,
                firstRent: request.body.firstRent,
                endRent: request.body.endRent,
                delivery: request.body.delivery,
            };

            // Push it on to our list of all renters
            console.log('The new rentee\'s info:', renterInfo);
            listingModels.allRent.push(renterInfo);
            return response.redirect('/thanks');
        }

        contextData.errors = errors;
    } else {
        console.log('This is a GET request');

    }

    return response.render('rent', contextData);
}


function itemDetails(req, res) {
    const listingID = parseInt(req.params.listingID, 10);
        csv.fromPath('out.csv', {headers: true})
          .on('data', function(data) {
            fileRows.push(data);

            // `data` is an array containing the values
            // of the current line in the file
            //console.log(data);
          })
          .on('end', function() {
            console.log('Gettig ready...');
            for (let i = 0; i < fileRows.length; i += 1) {
                    if (listingID == fileRows[i].id) {
                        theList = fileRows[i];
                    }
                }
            const contextData = {
                id: listingID,
                title: 'Listing\'s Details',
                object: theList.object,
                price: theList.price,
                image: theList.image,
                firstAvail: theList.firstAvail,
                lastAvail: theList.lastAvail,
                pickup: 'Pickup at Yale SOM',
                delivery: 'Delivery',
            };
            if (!theList) {
                res.send('could not find listing! should send error page 404');
            } else {
                res.render('item_details', contextData);
            }
          });
}


function thanks(request, response) {
    const contextData = {
        title: 'Thank you!',
        salutation: 'Welcome to Y-Circular!',

    };
    response.render('thanks', contextData);
}


module.exports = {
    index,
    homepage,
    formSubmit,
    rentSubmit,
    itemDetails,
    thanks,
};

// unfortunaley calling the function bellow
// is asynchronous
function getLastId() {
        csv.fromPath('out.csv', {headers: true})
          .on('data', function(data) {
            fileRows.push(data);

            // `data` is an array containing the values
            // of the current line in the file
            //console.log(data);
          })
          .on('end', function() {
            console.log('Parsing complete!');
            var n = Math.max(...fileRows.map(x => x.id));
            console.log(n);
            return n;
          });

}


function getFromId(id) {
        csv.fromPath('out.csv', {headers: true})
          .on('data', function(data) {
            fileRows.push(data);

            // `data` is an array containing the values
            // of the current line in the file
            //console.log(data);
          })
          .on('end', function() {
            console.log('this one not ready...');
            for (let i = 0; i < fileRows.length; i += 1) {
                    console.log(fileRows[i].id);
                    if (id == fileRows[i].id) {
                        console.log(fileRows[i]);
                        return fileRows[i];
                    }
                }
                return null;
          });

}

