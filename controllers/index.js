const store = require('../models/listing.js');
var nodemailer = require('nodemailer');
const express = require('express');
var router = express.Router();
var num2 = 0;
var theList = [];
var renterInfo2 = [];
var id_listing;
var async = require('async');



// Establish SQL database connection
const { Client } = require('pg');
const { Pool } = require('pg');

const client = new Client({
    connectionString: 'postgres://srtkdectxghkmw:8c7ca2be49603ed01ded285a6250e2d1ba5d16329d7ed22e796edbb78a3758a6@ec2-54-243-212-227.compute-1.amazonaws.com:5432/d2lk88cg6v0e33',
    ssl: true,
});


const pool = new Pool({
    connectionString: 'postgres://srtkdectxghkmw:8c7ca2be49603ed01ded285a6250e2d1ba5d16329d7ed22e796edbb78a3758a6@ec2-54-243-212-227.compute-1.amazonaws.com:5432/d2lk88cg6v0e33',
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

}

function homepage(request, response) {
    const contextData = {
        title: 'Welcome!',
        salutation: 'Welcome to Y-Circular!',
    };
    response.render('homepage', contextData);
}

async function formSubmit(request, response) {

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
        // note to myself: create validations for the fields below
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

            console.log(newListing);
            // JS Method
            store.addListing(newListing);
            // Push it on to our list of all listings
            let success = await storage(newListing.name, newListing.email,
            newListing.school, newListing.gradyear, newListing.phone,
            newListing.object, newListing.price, newListing.image,
            newListing.firstavail, newListing.lastavail);



            return response.redirect('/listing/' + success);

            }

        contextData.errors = errors;
    } else {
        console.log('This is a GET request');
    }
    return response.render('form', contextData);
}



function rentSubmit(request, response) {
    console.log(id_listing);


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

            //return response.redirect(`/thanks/${renterInfo.id}`);
            return response.redirect('/thanks');
        }

        contextData.errors = errors;
    } else {
        console.log('This is a GET request');

    }

    return response.render('rent', contextData);
}


async function itemDetails(req, response) {
    // get listing ID
    const item_number = parseInt(req.params.listingID, 10);
    //console.log("blabla" + typeof(listingID) + listingID );
    // PostgreSQL Method
    // line below commented since we only need one connection.
    //pool.connect();
    // WE HAVE TO CHECK WHEN IS THE RIGHT TIME TO DISCCONECT FROM POSTGRES
    //pool.query('SELECT * FROM listings WHERE id = $1;', [listingID], (err, res) => {
    //    if (err) {
    //        throw err;
    //    } else {

//    let ident = new Promise((resolve, reject) => {
//        const listingID = parseInt(req.params.listingID, 10);
//        console.log("blabla" + typeof(listingID) + listingID );
//        resolve(listingID);
//    });



//    ident.then((k) => {
async function seila(){
        const theList = await quering(item_number);
        return theList;
}


        seila().then((s) => {
        console.log("LIST " + s);
        //console.log("item_number " + item_number);
            //theList = res.rows[0];
            // define context data
            const contextData = {
                id: s.id,
                title: 'Listing\'s Details',
                object: s.object,
                price: s.price,
                im: s.image,
                firstavail: s.firstavail,
                lastavail: s.lastavail,
                delivery: 'Delivery',
            };
                console.log(contextData);
                response.render('item_details', contextData);
        });
    //    });
    //});
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



module.exports = {
    index,
    homepage,
    formSubmit,
    rentSubmit,
    itemDetails,
    emailConfirm,
};

function storage(NAME, EMAIL, SCHOOL, GRADYEAR, PHONE, OBJECT, PRICE, IMAGE, FIRSTAVAIL, LASTAVAIL){
    return new Promise(resolve => {

    pool.connect();
    pool.query('INSERT INTO listings (name, email, school, gradyear, phone, object, price, image, firstavail, lastavail) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;', [NAME, EMAIL, SCHOOL, GRADYEAR, PHONE, OBJECT, PRICE, IMAGE, FIRSTAVAIL, LASTAVAIL], (err, res) => {
        if (err) {
            throw err;
        } else {
            var listingID = parseInt(res.rows[0].id, 10);

            console.log("line 92 listingID:",  listingID);
            resolve(listingID);
        }
    });
});
}


async function quering(code2){
    const listID = await listIdentification(code2);
    return new Promise(resolve => {
    pool.query('SELECT * FROM listings WHERE id = $1;', [listID], (err, res) => {
        if (err) {
            throw err;
        } else {
            const theList = res.rows[0];
            resolve(theList);
        }
    });
});
}



async function listIdentification(code){
    return new Promise((resolve, reject) => {
        try {
            const listingID = parseInt(code, 10);
            console.log("check " + typeof(listingID) + listingID );
            resolve(listingID);
        } catch (error)
        {
            reject(error);
        }
        });
}