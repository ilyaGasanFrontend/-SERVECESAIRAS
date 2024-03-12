const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

var _dirname = '/home/gasan/web_dir_pr/';

app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist')));
app.use('/css', express.static(path.join(_dirname, 'styles'), { 'extensions': ['css'] }));

const urlencodedParser = bodyParser.urlencoded({
    extended: false,
});

app.get("/", urlencodedParser, (request, response) => {
    response.sendFile(path.join(__dirname, 'views/form.html'));
});

app.post('/', urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    
    // Redirect to the /info page with the data as query parameters
    response.redirect('/info?email=' + encodeURIComponent(request.body.email) + '&mark=' + encodeURIComponent(request.body.mark) + '&text=' + encodeURIComponent(request.body.text));
});

app.get('/info', (request, response) => {
    // Retrieve data from query parameters
    const email = request.query.email || 'N/A';
    const mark = request.query.mark || 'N/A';
    const text = request.query.text || 'N/A';

    // Render the info page with the retrieved data
    response.sendFile(path.join(__dirname, 'views/info.html'));
});

app.listen(3000, () => {
    console.log('Listening on port ' + 3000);
});
