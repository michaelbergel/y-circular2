'use strict';

// SQL
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://srtkdectxghkmw:8c7ca2be49603ed01ded285a6250e2d1ba5d16329d7ed22e796edbb78a3758a6@ec2-54-243-212-227.compute-1.amazonaws.com:5432/d2lk88cg6v0e33',
    ssl: true,
});

// Add listing to listing SQL table
function addListingSQL(name, email, school, gradyear, phone, object, price, image, firstavail, lastavail) {
    client.connect();
    client.query('INSERT INTO listings (name, email, school, gradyear, phone, object, price, image, firstavail, lastavail) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;', [name, email, school, gradyear, phone, object, price, image, firstavail, lastavail], (err, res) => {
        if (err) throw err;
        // var listingID = [];
        // listingID.push(res.rows[0].id);
        // console.log(listingID);
        // listingID.send(listingID);
        // console.log(res.rows);
    client.end();
    });
}

// Add rentee info to rentee SQL table
function addRenteeSQL(name, email, phone, address, object, firstrent, endrent, delivery, id_listing, price, daterequested) {
    client.connect();
    client.query('INSERT INTO rentees (name, email, phone, address, object, firstrent, endrent, delivery, id_listing, price, daterequested) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;', [name, email, phone, address, object, firstrent, endrent, delivery, id_listing, price, daterequested], (err) => {
        if (err) throw err;
        // console.log(res.rows);
        // client.end();
    });
}

// An Array of all the events
const allListings = [
    {
        id: 0,
        name: 'Bella',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        email: ['kyle.jensen@yale.edu'],
        school: 'SOM',
        gradyear: '19',
        phone: '475 201 8669',
        object: 'Vacuum',
        price: '50',
        image: 'http://i.imgur.com/pXjrQ.gif',
        firstavail: new Date(2018, 0, 17, 16, 30, 0),
        lastavail: new Date(2018, 0, 17, 16, 30, 0),
    },
    {
        id: 1,
        name: 'Mike',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        email: ['mike.jensen@yale.edu'],
        school: 'FES',
        gradyear: '22',
        phone: '475 201 8669',
        object: 'Cell Phone',
        price: '150',
        image: 'http://i.imgur.com/pXjrQ.gif',
        firstavail: new Date(2018, 0, 17, 16, 30, 0),
        lastavail: new Date(2018, 0, 17, 16, 30, 0),
    },
];

const allRentees = [
    {
        id: 0,
        name: 'David',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        email: ['david.malan@harvard.edu'],
        phone: '475 201 8669',
        address: '45 Whitney Ave, Apt 3, New Haven, CT, 06511',
        object: 'Vacuum',
        price: '$50.00',
        firstavail: new Date(2018, 0, 17, 16, 30, 0),
        lastavail: new Date(2018, 0, 17, 16, 30, 0),
        receiveVia: 'delivery',
    },
    {
        id: 1,
        name: 'Mike',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        email: ['mike.jensen@yale.edu'],
        phone: '475 201 8669',
        address: '70 Whalley Ave, Apt 430, New Haven, CT, 06511',
        object: 'Cell Phone',
        price: '$150.00',
        firstavail: new Date(2018, 0, 17, 16, 30, 0),
        lastavail: new Date(2018, 0, 17, 16, 30, 0),
        receiveVia: 'som',
    },
];

// Add listing to allListings
function addListing(listing) {
    allListings.push(listing);
}

// Add listing to allListings
function addRentee(rentee) {
    allRentees.push(rentee);
}

/**
 * Returns the first event that has a particular id.
 */
function getById(id) {
    for (let i = 0; i < allListings.length; i += 1) {
        if (id === allListings[i].id) {
            return allListings[i];
        }
    }
    return null;
}


function getMaxId() {
    return Math.max(...allListings.map(x => x.id));
}

module.exports = {
    allList: allListings,
    allRent: allRentees,
    // listingID,
    getById,
    getMaxId,
    addListing,
    addListingSQL,
    addRentee,
    addRenteeSQL,
};
