const listingModels = require('../models/listing.js');
const fs = require("fs");
var csv = require('fast-csv');
var fileRows = [];
var renteesRows = [];
var num = 0;
var num2 = 0;
var theList = [];
var id_listing;



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
    // the id for the last listing on the CSV
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
    console.log(id_listing);
        csv.fromPath('rentees.csv', {headers: true})
          .on('data', function(data) {
            renteesRows.push(data);

            // `data` is an array containing the values
            // of the current line in the file
            //console.log(data);
          })
          .on('end', function() {
            console.log('Parsing rentees complete!');
            num2 = Math.max(...renteesRows.map(x => x.id));
            console.log(num2);
          });

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
                id_renter: theList.id,
            };
            renterInfo.id = num2 + 1;
            console.log('The new rentee\'s info:', renterInfo);

            // storing the info into CSV file
            var csvWriter = require('csv-write-stream');
                if (!fs.existsSync('rentees.csv')){
                    writer = csvWriter({ headers: ["id", "name", "email", "phone", "address", "object", "firstRent", "endRent", "delivery", "id_renter"]});
                    writer.pipe(fs.createWriteStream('rentees.csv'));
                    writer.write([renterInfo.id, renterInfo.name, renterInfo.email, renterInfo.phone, renterInfo.address, renterInfo.object, renterInfo.firstRent, renterInfo.endRent, renterInfo.delivery, renterInfo.id_renter]);
                }
                else{
                writer = csvWriter({sendHeaders: false});

                writer.pipe(fs.createWriteStream('rentees.csv', {flags: 'a'}));
                writer.write({
                    header1:renterInfo.id,
                    header2:renterInfo.name,
                    header3:renterInfo.email,
                    header4:renterInfo.phone,
                    header5:renterInfo.address,
                    header6:renterInfo.object,
                    header7:renterInfo.firstRent,
                    header8:renterInfo.endRent,
                    header9:renterInfo.delivery,
                    header10:renterInfo.id_renter,
                });
                }
            writer.end();
            // csv writing ends here

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
                         // we need to store the ID of the add to link it to
                        // an eventual rentee's request
                        id_listing = listingID;
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


function downloadlistings(request, response) {

    response.download('out.csv');

}

function downloadrentees(request, response) {

    response.download('rentees.csv');

}


module.exports = {
    index,
    homepage,
    formSubmit,
    rentSubmit,
    itemDetails,
    thanks,
    downloadlistings,
    downloadrentees,
};

// unfortunaley calling the function bellow
// is asynchronous
// function getLastId() {
//         csv.fromPath('out.csv', {headers: true})
//           .on('data', function(data) {
//             fileRows.push(data);

//             // `data` is an array containing the values
//             // of the current line in the file
//             //console.log(data);
//           })
//           .on('end', function() {
//             console.log('Parsing complete!');
//             var n = Math.max(...fileRows.map(x => x.id));
//             console.log(n);
//             return n;
//           });

// }