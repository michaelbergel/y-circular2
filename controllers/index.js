const store = require('../models/listing.js');
var nodemailer = require('nodemailer');
const express = require('express');
var router = express.Router();
var csvWriter = require('csv-write-stream');
const fs = require("fs");
var csv = require('fast-csv');
var fileRows = [];
var renteesRows = [];
var num = 0;
var num2 = 0;
var theList = [];
var renterInfo2 = [];
var id_listing;

// Establish SQL database connection
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://noienswmyhkwiz:a75a21b145dffc1a7b88967912a9f965f37040eba69eab219c24822abe0fb88e@ec2-54-243-150-10.compute-1.amazonaws.com:5432/da95k05j4qmcl',
    ssl: true,
});

// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    // PostgreSQL Method
    client.connect();
    client.query('SELECT * FROM listings ORDER BY id DESC;', (err, res) => {
        if (err) {
            throw err;
        } else {
            const contextData = {
                title: 'Listings',
                salutation: "Browse all listings and see what you'd like to rent",
                listings: res.rows,
            };
            response.render('index', contextData);
        }
    });

    // CSV Method
    // the code below parses data from out.csv
    // and stores into an array called data

    // csv.fromPath('out.csv', {headers: true})
    //       .on('data', function(data) {
    //         fileRows.push(data);

    //         // `data` is an array containing the values
    //         // of the current line in the file
    //       })
    //       .on('end', function() {
    //         console.log('Parsing awesome!');
    //         const contextData = {
    //             title: 'Listings',
    //             salutation: "Browse all listings and see what you'd like to rent",
    //             listings: fileRows,
    //         };
    //         response.render('index', contextData);
    //       });
    // // csv reading code up goes up to here

    // // we need to reset the array or it will keep on increasing forever
    // fileRows = [];
}

function homepage(request, response) {
    const contextData = {
        title: 'Welcome!',
        salutation: 'Welcome to Y-Circular!',
    };
    response.render('homepage', contextData);
}

function formSubmit(request, response) {

    // CSV Method
    // DUE TO ASYNC of the lines below, there was no way to keep it into a function
    // we had to implement it in every function we needed the id for the last listing on the CSV
        // csv.fromPath('out.csv', {headers: true})
        //   .on('data', function(data) {
        //     fileRows.push(data);

        //     // `data` is an array containing the values
        //     // of the current line in the file
        //     //console.log(data);
        //   })
        //   .on('end', function() {
        //     console.log('Parsing complete!');
        //     num = Math.max(...fileRows.map(x => x.id));
        //     console.log(num);
        //   });

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
                id: store.allList[store.allList.length - 1].id + 1,
                name: request.body.name,
                email: request.body.email,
                school: request.body.school,
                gradyear: request.body.gradyear,
                phone: request.body.phone,
                object: request.body.object,
                price: request.body.price,
                image: request.body.image,
                firstavail: request.body.firstAvail,
                lastavail: request.body.lastAvail,
            };
            // newListing.id = num + 1;

            // JS Method
            store.addListing(newListing);
            // Push it on to our list of all listings

            // Add listing to listing SQL table (bandaid - use below method eventually)
                var listingID;
                client.connect();
                client.query('INSERT INTO listings (name, email, school, gradyear, phone, object, price, image, firstavail, lastavail) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;', [request.body.name, request.body.email, request.body.school, request.body.gradyear, request.body.phone, request.body.object, request.body.price, request.body.image, request.body.firstavail, request.body.lastavail], (err, res) => {
                    if (err) throw err;
                    var listingID = res.rows[0].id;
                    client.end();
                    console.log('some listing id: ',listingID);
                    cb(listingID);
                    // console.log(res.rows);
                });
                response.redirect(`/listing/${listingID}`);
                // var q = client.query('INSERT INTO listings (name, email, school, gradyear, phone, object, price, image, firstavail, lastavail) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;', [request.body.name, request.body.email, request.body.school, request.body.gradyear, request.body.phone, request.body.object, request.body.price, request.body.image, request.body.firstavail, request.body.lastavail]);
                // console.log(q.id);


            // Use this PostgreSQL Method when figure out how to pass vars from on js file to another
            // store.addListingSQL(request.body.name, request.body.email,
            //     request.body.school, request.body.gradyear, request.body.phone,
            //     request.body.object, request.body.price, request.body.image,
            //     request.body.firstavail, request.body.lastavail);

            // CSV Method
            // write to the csv out.csv
            // take the "//" from below if not working
            // var fs = require("fs");
            // if (!fs.existsSync('out.csv')) {
            //     writer = csvWriter({ headers: ["id", "name", "email", "school", "gradYear", "phone", "object", "price", "image", "firstAvail", "lastAvail"]});
            //     writer.pipe(fs.createWriteStream('out.csv'));
            //     writer.write([newListing.id, newListing.name, newListing.email, newListing.school, newListing.gradYear, newListing.phone, newListing.object, newListing.price, newListing.image, newListing.firstAvail, newListing.lastAvail]);
            // } else {
            //     writer = csvWriter({sendHeaders: false});

            //     writer.pipe(fs.createWriteStream('out.csv', {flags: 'a'}));
            //     writer.write({
            //         header1:newListing.id,
            //         header2:newListing.name,
            //         header3:newListing.email,
            //         header4:newListing.school,
            //         header5:newListing.gradYear,
            //         header6:newListing.phone,
            //         header7:newListing.object,
            //         header8:newListing.price,
            //         header9:newListing.image,
            //         header10:newListing.firstAvail,
            //         header11:newListing.lastAvail,
            //     });
            // }
            // writer.end();
            // CSV writing ends here
        }
        contextData.errors = errors;
    } else {
        console.log('This is a GET request');
    }
    return response.render('form', contextData);
}


function rentSubmit(request, response) {
    console.log(id_listing);
    // CSV Method
    // csv.fromPath('rentees.csv', {headers: true})
    //   .on('data', function(data) {
    //     renteesRows.push(data);

    //     // `data` is an array containing the values
    //     // of the current line in the file
    //     //console.log(data);
    //   })
    //   .on('end', function() {
    //     console.log('Parsing rentees complete!');
    //     num2 = Math.max(...renteesRows.map(x => x.id));
    //     console.log(num2);
    //   });

    // Start with an empty array of errors
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
        // PostgreSQL Method
            store.addRenteeSQL(request.body.name, request.body.email,
                request.body.phone, request.body.address, theList.object,
                request.body.firstrent, request.body.endrent, request.body.delivery,
                theList.id);

        // Create a new listing! Find a good id (e.g. max existing id + 1)
            const renterInfo = {
                name: request.body.name,
                email: request.body.email,
                phone: request.body.phone,
                address: request.body.address,
                object: theList.object,
                firstRent: request.body.firstRent,
                endRent: request.body.endRent,
                delivery: request.body.delivery,
                id_listing: theList.id,
            };
            renterInfo.id = num2 + 1;
            renterInfo2 = renterInfo;

            // CSV Method
            //     if (!fs.existsSync('rentees.csv')){
            //         writer = csvWriter({ headers: ["id", "name", "email", "phone", "address", "object", "firstrent", "endrent", "delivery", "id_listing"]});
            //         writer.pipe(fs.createWriteStream('rentees.csv'));
            //         writer.write([renterInfo.id, renterInfo.name, renterInfo.email, renterInfo.phone, renterInfo.address, renterInfo.object, renterInfo.firstrent, renterInfo.endrent, renterInfo.delivery, renterInfo.id_listing]);
            //     }
            //     else{
            //     writer = csvWriter({sendHeaders: false});

            //     writer.pipe(fs.createWriteStream('rentees.csv', {flags: 'a'}));
            //     writer.write({
            //         header1:renterInfo.id,
            //         header2:renterInfo.name,
            //         header3:renterInfo.email,
            //         header4:renterInfo.phone,
            //         header5:renterInfo.address,
            //         header6:renterInfo.object,
            //         header7:renterInfo.firstrent,
            //         header8:renterInfo.endrent,
            //         header9:renterInfo.delivery,
            //         header10:renterInfo.id_renter,
            //     });
            //     }
            // writer.end();
            // csv writing ends here

            //return response.redirect(`/thanks/${renterInfo.id}`);
            return response.redirect('/thanks');
        }

        contextData.errors = errors;
    } else {
        console.log('This is a GET request');

    }

    return response.render('rent', contextData);
}


function itemDetails(req, response) {
    // get listing ID
    const listingID = parseInt(req.params.listingID, 10);
    // PostgreSQL Method
    // query listing
    client.connect();
    client.query('SELECT * FROM listings WHERE id = $1;', [listingID], (err, res) => {
        if (err) {
            throw err;
        } else {
            theList = res.rows[0];
            // define context data
            const contextData = {
                id: listingID,
                title: 'Listing\'s Details',
                object: theList.object,
                price: theList.price,
                image: theList.image,
                firstavail: theList.firstavail,
                lastavail: theList.lastavail,
                pickup: 'Pickup at Yale SOM',
                delivery: 'Delivery',
            };
            if (!res.rows) {
                response.send('Could not find listing! Error: 404');
            } else {
                response.render('item_details', contextData);
            }
        }
    });

    // CSV Method
    // const listingID = parseInt(req.params.listingID, 10);
    //     csv.fromPath('out.csv', {headers: true})
    //       .on('data', function(data) {
    //         fileRows.push(data);

    //         // `data` is an array containing the values of the current line in the file
    //         //console.log(data);
    //       })
    //       .on('end', function() {
    //         console.log('Getting ready...');
    //         for (let i = 0; i < fileRows.length; i += 1) {
    //                 if (listingID == fileRows[i].id) {
    //                     // console.log(fileRows[i].id);
    //                     theList = fileRows[i];
    //                      // we need to store the ID of the add to link it to
    //                     // an eventual rentee's request
    //                     id_listing = listingID;
    //                 }
    //             }

    //         const contextData = {
    //             id: listingID,
    //             title: 'Listing\'s Details',
    //             object: theList.object,
    //             price: theList.price,
    //             image: theList.image,
    //             firstAvail: theList.firstAvail,
    //             lastAvail: theList.lastAvail,
    //             pickup: 'Pickup at Yale SOM',
    //             delivery: 'Delivery',
    //         };
    //         if (!theList) {
    //             res.send('could not find listing! should send error page 404');
    //         } else {
    //             res.render('item_details', contextData);
    //         }
    //       });
}


function emailConfirm(req, res) {
        // console.log(theList.email);
        // console.log(renterInfo2.email);
        if (!theList) {
            res.send('Could not find listing! Error: 404');
        }   else {

                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'ycircularllc@gmail.com', // Your email id
                        pass: 'marinaroriz' // Your password
                    }
                });

                var text = "Object:" + theList.object + ". Renter: " + theList.email + ". Interested: " + renterInfo2.email + ". You may reach out to each other to arrange delivery details. Reach out to marina.roriz@yale.edu for further assitance, if needed.";

                var mailOptions = {
                from: 'ycircularllc@gmail.com', // sender address
                to: theList.email + ","+ renterInfo2.email, // list of receivers
                subject: `Thanks for using Y Circular! Item: ${theList.object}, ID:${theList.id}`, // Subject line
                // text: text //, // plaintext body
                html: text // You can choose to send an HTML body instead
                };

                res.render('thanks');

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                        res.json({yo: 'error'});
                    } else{
                        console.log('Message sent: ' + info.response);
                        res.json({yo: info.response});
                    }
                });

            }
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
    emailConfirm,
    downloadlistings,
    downloadrentees,
};

/* ---------------> function to delete a row from reference: id
/
/
// The id below will be used to reference the row (i.e. listing to be deleted)
var idToSearchFor = 2;
// read the file
fs.readFile('csv.csv', 'utf8', function(err, data)
{

    if (err)
    {
        // check and handle err
    }
    // Get an array of comma separated lines
    // the slice 0 means "start fom row 0"
    let linesExceptFirst = data.split('\n').slice(0);
    // Turn that into a data structure we can parse (array of arrays)
    let linesArr = linesExceptFirst.map(line=>line.split(','));
    // Use filter to find the matching ID then return only those that don't matching
    // deleting the found match
    // Join then into a string with new lines
    let output = linesArr.filter(line=>parseInt(line[0]) !== idToSearchFor).join("\n");
    // Write out new file
    fs.writeFileSync('new.csv', output);

});
*/