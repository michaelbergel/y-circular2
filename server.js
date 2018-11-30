const app = require('./app.js');

// Start up the application and listen on the specified
// port, or default to port 4000.
const port = process.env.PORT || 4000;
app.listen(port, () => {
    const hostname = process.env.C9_HOSTNAME || `localhost:${port}`;
    console.log(`App running at http://${hostname}`);
});
