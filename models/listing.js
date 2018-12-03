'use strict';

/**
 * An Array of all the events
 */
const allListings = [
    {
        id: 0,
        name: 'Bella',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        email: ['kyle.jensen@yale.edu'],
        school: 'SOM',
        class_: '19',
        phone: '475 201 8669',
        object: 'Vacuum',
        price: '50',
        image: 'http://i.imgur.com/pXjrQ.gif',
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
    },
    {
        id: 1,
        name: 'Mike',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        email: ['mike.jensen@yale.edu'],
        school: 'FES',
        class_: '22',
        phone: '475 201 8669',
        object: 'Cell Phone',
        price: '150',
        image: 'http://i.imgur.com/pXjrQ.gif',
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
    },
];

const allRenters = [
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
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
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
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
        receiveVia: 'som',
    },
];

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
    all: allListings,
    allRent: allRenters,
    getById,
    getMaxId,
};
