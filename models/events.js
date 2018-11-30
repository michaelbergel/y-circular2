'use strict';

/**
 * An Array of all the events
 */
const allEvents = [
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
    },
];


/**
 * Returns the first event that has a particular id.
 */
function getById(id) {
    for (let i = 0; i < allEvents.length; i += 1) {
        if (id === allEvents[i].id) {
            return allEvents[i];
        }
    }
    return null;
}


function getMaxId() {
    return Math.max(...allEvents.map(x => x.id));
}

module.exports = {
    all: allEvents,
    getById,
    getMaxId,
};
