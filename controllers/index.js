const eventModels = require('../models/events.js');


// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    const contextData = {
        title: 'Listings',
        salutation: "Browse all listings and see what you'd like to rent",
        events: eventModels.all,
    };
    response.render('index', contextData);
}

function homepage(request, response) {
    const contextData = {
        title: 'Welcome!',
        salutation: 'Welcome to Y-Circular!',

    };
    response.render('homepage', contextData);
}

function formSubmit(request, response) {
    // The form data are in `request.body`. We need to get
    // these data out and use them to create a new event,
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

        if (!request.body.name_listing || request.body.name_listing.length > 101) {
            errors.push('Please fill out your name');
        }

        if (errors.length === 0) {
        // Create a new event! Find a good id (e.g. max existing id + 1)
            const newListing = {
                name: request.body.name_listing,
                email: request.body.email,
                school: request.body.school,
                class_: request.body.class,
                phone: request.body.phone,
                object: request.body.object,
                price: request.body.price,
                image: request.body.pic,
            };
            newListing.id = eventModels.getMaxId() + 1;
            // Push it on to our list of all events
            console.log('The new listing\'s info:', newListing);
            eventModels.all.push(newListing);
            // return response.redirect('/events/'+ newEvent.id);
            return response.redirect(`/listing/${newListing.id}`);
        }

        contextData.errors = errors;
    } else {
        console.log('This is a GET request');
    }

    return response.render('form', contextData);
}


function itemDetails(req, res) {
    const eventID = parseInt(req.params.eventID, 10);
    const theList = eventModels.getById(eventID);
    const contextData = {
        title: 'Event\'s Details',
        salutation: 'RSVP to this event',
        evTitle: theEvent.title,
        date: theEvent.date,
        location: theEvent.location,
        attending: theEvent.attending,
        image: theEvent.image,
    };
    theEvent.salutation = 'These are the details of the event! RSVP to attend. You can also make a donation!';
    if (!theEvent) {
        res.send('could not find event! should send 404');
    } else {
        res.render('item_details', contextData);
    }
}


module.exports = {
    index,
    homepage,
    formSubmit,
    itemDetails,
};
