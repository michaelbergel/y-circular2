'use strict';

/**
 * An Array of all the events
 */
const allListings = [
    {
        id: 0,
        item: 'Vacuum',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
        image: 'https://i.imgur.com/51RWsi1.jpg',
        dailyPrice: '$3.00',
    },
    {
        id: 1,
        item: 'Dumbbells',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
        image: 'https://i.imgur.com/0ml3vxj.mp4',
        dailyPrice: '$6.00',
    },
    {
        id: 2,
        item: 'Squatty Potty',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
        image: 'https://i.imgur.com/e7klUOn.jpg',
        dailyPrice: '$2.00',
    },
    {
        id: 4,
        item: 'Blow Dryer',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        firstAvail: new Date(2018, 0, 17, 16, 30, 0),
        lastAvail: new Date(2018, 0, 17, 16, 30, 0),
        image: 'https://i.imgur.com/lBmo4DU.gif',
        dailyPrice: '$2.50',
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
    getById,
    getMaxId,
};
