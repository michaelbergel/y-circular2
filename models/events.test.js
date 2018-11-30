/* globals describe, test, expect */
/* The proceeding line is for eslint, so that it knows about
   certain functions Jest provides and does not complain about
   them not being provided.
*/
const eventModels = require('./events.js');

describe('getById', () => {
    test('should return null when an event is not found', (done) => {
        expect(eventModels.getById(-1)).toBe(null);
        done();
    });
    test('should retreive events by their id', (done) => {
        const eventID = eventModels.getById(2).id;
        expect(eventID).toBe(2);
        done();
    });
});
