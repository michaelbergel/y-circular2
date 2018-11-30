/* globals describe, test, expect */
/* The proceeding line is for eslint, so that it knows about
   certain functions Jest provides and does not complain about
   them not being provided.
*/

// Jest testing for our app. Tests are useful and you should
// write them! They're for you, not for me (Kyle).
// See http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// and https://jestjs.io/docs/en/getting-started
const request = require('supertest');
const app = require('./app.js');

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode)
                    .toBe(200);
                done();
            });
    });
});
