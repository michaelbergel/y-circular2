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
    client.connect(); // Apparently no need to close the connection: https://github.com/brianc/node-postgres/issues/1670
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



async function rentSubmit(request, response) {

    var today = new Date().toLocaleString();

    // get listing ID
    //const item_number = parseInt(request.params.id, 10);

    // this function will return the array with the listin's inf
    //async function arr(){
            // the await ensures the async code won´t continue forward until the fn quering is done
            // see fn quering in the bottom of code
    //    const theList = await quering(item_number);
    //    return theList;
    //}



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


        if (itemDetail === undefined || itemDetail.length == 0 || itemDetail.object === undefined ||itemDetail.price === undefined ) {
            errors.push('Could not proceed with request. Please try again. Error: listing detail missing');
            // alert('Please fill out your name');
        }



        if (errors.length === 0) {


        // the syntax then(s), s is whatever is resolved/returned from the function arr
        // mwhich in this  case, is the array theList. So s is a reference to theList!
        //arr().then((s) => {
        //console.log("LIST " + s);


        // PostgreSQL Method
            store.addRenteeSQL(request.body.name, request.body.email,
                request.body.phone, request.body.address, itemDetail.object,
                request.body.firstRent, request.body.endRent, request.body.delivery,
                itemDetail.id, itemDetail.price, today);


            const renterInfo = {
                name: request.body.name,
                email: request.body.email,
                phone: request.body.phone,
                object: itemDetail.object,
                address: request.body.address,
                firstRent: request.body.firstRent,
                endRent: request.body.endRent,
                delivery: request.body.delivery,
                id_listing: itemDetail.id,
                price: itemDetail.price,
                date: today
            };
            // this is the interested party´s email
            itemDetail.emailRentee = renterInfo.email;

            //renterInfo.id = num2 + 1;
            //renterInfo2 = renterInfo;

            console.log(renterInfo);

            //return response.redirect(`/thanks/${renterInfo.id}`);
           return response.redirect('/thanks');
        //});
        }

        contextData.errors = errors;
    } else {
        console.log('This is a GET request');

    }

    return response.render('rent', contextData);
}

//declaring outside so the functions email and rentSubmit can access it
let itemDetail = [];

async function itemDetails(req, response) {
    // get listing ID
    const item_number = parseInt(req.params.listingID, 10);

    // line below will be used to test if image has proper and valid URL
    // without this validation the code will crash.
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    // this function will return the array with the listin's info
    async function arr(){
            // the await ensures the async code won´t continue forward until the fn quering is done
            // see fn quering in the bottom of code
            const theList = await quering(item_number);
            return theList;
    }


        // the syntax then(s), s is whatever is resolved/returned from the function arr
        // mwhich in this  case, is the array theList. So s is a reference to theList!
        arr().then((s) => {
        console.log("LIST " + s);

        // if the URL isn't valid, return empty string to avoid crashing code
        if (!pattern.test(s.image))
        {
              s.image="";
        }

            // define context data
            itemDetail = {
                id: s.id,
                title: 'Listing\'s Details',
                object: s.object,
                price: s.price,
                im: s.image,
                firstavail: s.firstavail,
                lastavail: s.lastavail,
                renterEmail: s.email,
                delivery: 'Delivery',
            };
                console.log(itemDetail);
                response.render('item_details', itemDetail);
        });
    //    });
    //});
}


function emailConfirm(req, res) {
         console.log(itemDetail.emailRentee);
         console.log(itemDetail.renterEmail);

         const contextD = {
            title: 'Thanks for using YCircular!',
            errors: [],
        };




        if (itemDetail === undefined || itemDetail.length == 0 || itemDetail.emailRentee === undefined ||itemDetail.renterEmail === undefined ) {
            contextD.errors.push('Could not proceed with your request. Please try again! Error: itemDetail');
            res.render('item_details', contextD);
        }  else {

                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'ycircularllc@gmail.com', // Your email id
                        pass: 'marinaroriz' // Your password
                    }
                });

                var text = "Object: " + itemDetail.object + ". Renter: " + itemDetail.renterEmail + ". Interested: " + itemDetail.emailRentee + ". You may reach out to each other to arrange delivery details. Reach out to marina.roriz@yale.edu for further assitance, if needed.";

                var mailOptions = {
                from: 'ycircularllc@gmail.com', // sender address
                to: itemDetail.renterEmail + ","+ itemDetail.emailRentee, // list of receivers
                subject: `Thanks for using Y Circular! Item: ${itemDetail.object}, ID:${itemDetail.id}`, // Subject line
                // text: text //, // plaintext body
                html: text // You can choose to send an HTML body instead
                };

                console.log('Message sent!');
                res.render('thanks', contextD);

                // the block below is probably unnecessary - if we get an error, we will catch it above in the if statement
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