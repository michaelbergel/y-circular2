const eventModels=require('../models/events.js');



// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    const contextData = {
        title: 'Party Monsters',
        salutation: 'Party Monsters, the Best Events in New Haven',
        events: eventModels.all,
    };
    response.render('index', contextData);
   
}

function about(request, response) {
    const contextData = {
        title: 'About our Team',
        salutation: 'Take a look at our headshots',

    };
    response.render('about', contextData);
   
}


//Create a function for the detailed page

function event_details(request,response){
    const contextData = {
        title: 'Event\'s Details',
        salutation: 'RSVP to this event',

    };
    response.render('event_details',contextData);
}


function form(request, response) {
    const contextData = {
        title: 'Create event',
        salutation: 'Let\'s create a new event!',

    };
    response.render('form', contextData);
   
}

function formSubmit(request, response) {
    
    // The form data are in `request.body`. We need to get
    // these data out and use them to create a new event,
    // or return some kind of error to the user if they
    // submitted invalid data.
    
    // Start with an empty array of errors
    const contextData ={
        title: 'Create event',
        salutation: 'Let\'s create a new event!',
        errors: [],
    };
    
    if (request.method =='POST'){
    const errors = [];

    
    
    if (!request.body.title_event || request.body.title_event.length > 51) {
        errors.push('Bad title for event!');
    }
    
    if (errors.length === 0){
        // Create a new event! Find a good id (e.g. max existing id + 1)
        const newEvent = {
            title: request.body.title_event,
            date: request.body.date_event,
            location: request.body.loc,
        };
            newEvent.id = eventModels.getMaxId() + 1;
        // Push it on to our list of all events
        console.log('The new event\'s info:', newEvent);
        eventModels.all.push(newEvent);
        return response.redirect('/events/'+ newEvent.id);
    }

        contextData.errors = errors;
 } else{
     console.log('This is a GET request');
 }


    return response.render('form', contextData);
   
} 


function eventDetail(req, res) {
    const eventID = parseInt(req.params.eventID);
    const theEvent = eventModels.getById(eventID);
    theEvent.salutation = 'These are the details of the event! RSVP to attend. You can also make a donation!';
    if (!theEvent) {
        res.send('could not find event! should send 404');
    }else{
        res.render('event_details',theEvent); 
    }
}


module.exports = {
    index,
    about,
    form,
    formSubmit,
    event_details,
    eventDetail,
};
