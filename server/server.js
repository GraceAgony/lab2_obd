var http     = require('http'),
    express  = require('express'),
    mysql    = require('mysql'),
    parser   = require('body-parser');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pass',
    database: 'flight1',
    multipleStatements: true
});

try {
    connection.connect();

} catch(e) {
    console.log('Database Connetion failed:' + e);
};
// Setup express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, OPTIONS, POST, PUT");
    // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.set('port', process.env.PORT || 5000);

// Set default route
app.get('/', function (req, res) {
    res.setHeader("Content-Type", "application/x-www-form-urlencoded");
    res.send('<html><body><p>Welcome to App</p></body></html>');
});

// Create server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});

// Endpoint: http://127.0.0.1:5000/flight/add
app.post('/flight/add', function (req,res) {
   // res.setHeader("Content-Type", "application/x-www-form-urlencoded");
    var response = [];
    console.log(req.body);
    if (
        typeof req.body.id_originalAirport !== 'undefined' &&
        typeof req.body.id_destinationAirport !== 'undefined' &&
        typeof req.body.id_company !== 'undefined' &&
        typeof req.body. id_plane !== 'undefined' &&
        typeof req.body.status !== 'undefined' &&
        typeof req.body.date !== 'undefined'
       // typeof req.body.id !== 'undefined'
    ) {
        var id_originalAirport = parseInt(req.body.id_originalAirport),
            id_destinationAirport = parseInt(req.body.id_destinationAirport),
            id_company = parseInt(req.body.id_company),
            id_plane = parseInt(req.body. id_plane),
            status = parseInt(req.body.status),
            date = req.body.date;
            //id = req.body.id;

        connection.query('INSERT INTO flights (id_originalAirport, id_destinationAirport, ' +
                                               'id_company, id_plane, status, date) ' +
                                                'VALUES (?, ?, ?, ?, ?, ?)',
            [id_originalAirport, id_destinationAirport, id_company,
                id_plane, status, date],
            function(err, result) {
                if (!err){

                    if (result.affectedRows != 0) {
                        response.push({'result' : 'success'});
                    } else {
                        response.push({'msg' : 'No Result Found'});
                    }

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(response));
                } else {
                    res.status(400).send(err);
                }
            });

    } else {
        response.push({'result' : 'error', 'msg' : 'Please fill required details'});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    }
});

// Endpoint: http://127.0.0.1:5000/flight/delete/{:flight id}
app.delete('/flight/delete/:id', function (req,res) {
    var id = req.params.id;
    console.log(id);
    connection.query('DELETE FROM flights WHERE id = ?', [id], function(err, result) {
        if (!err){
            var response = [];

            if (result.affectedRows != 0) {
                response.push({'result' : 'success'});
            } else {
                response.push({'msg' : 'No Result Found'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});

// Endpoint: http://127.0.0.1:5000/product/edit/{:product id}
app.post('/flight/edit/:id', function (req,res) {
    console.log(req.body);
    var id = req.params.id,
        response = [],
        field = req.body.field,
        key = req.body.key;

    if (
        typeof id !== 'undefined' &&
        typeof field !== 'undefined' &&
        typeof key !== 'undefined'
    ) {
        connection.query('UPDATE flights SET '+ field +' = ? WHERE id = ?',
            [key, id],
            function(err, result) {
                if (!err){

                    if (result.affectedRows != 0) {
                        response.push({'result' : 'success'});
                    } else {
                        response.push({'msg' : 'No Result Found'});
                    }

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(response));
                } else {
                    console.log(err);
                    res.status(400).send(err);
                }
            });

    } else {
        response.push({'result' : 'error', 'msg' : 'Please fill required information'});
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

app.get('/flight/all', function (req,res) {

    connection.query('SELECT * from flights', function(err, rows, fields) {
        if (!err){
            var response = [];

            if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
            } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
            }
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});


app.get('/company/all', function (req,res) {

    connection.query('SELECT * from company', function(err, rows, fields) {
        if (!err){
            var response = [];

            if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
            } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
            }
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});


app.get('/airport/all', function (req,res) {

    connection.query('SELECT * from airport', function(err, rows, fields) {
        if (!err){
            var response = [];

            if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
            } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
            }
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});



app.get('/plane/all', function (req,res) {

    connection.query('SELECT * from planes', function(err, rows, fields) {
        if (!err){
            var response = [];

            if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
            } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
            }
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});



app.post('/airports/loadFromFile', function(req, res) {

    var jsondata = req.body;
    var values = [];
    console.log(jsondata);
    for(var i=0; i< jsondata.length; i++)
        values.push([jsondata[i].address, jsondata[i].allow, jsondata[i].name]);
    console.log(values);
//Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)

    connection.query('DELETE FROM airport WHERE (id_airport NOT IN (SELECT id_originalAirport FROM flights GROUP BY id_originalAirport)) AND (id_airport NOT IN (SELECT id_destinationAirport FROM flights GROUP BY id_destinationAirport)); INSERT INTO airport (address, allow, name) VALUES ?', [values], function(err,result) {
        if(err) {
            res.send('Error');
            console.log(err);
        }
        else {
            res.send('Success');
        }
    });
});

app.post('/companys/loadFromFile', function(req, res) {

    var jsondata = req.body;
    var values = [];
    console.log(jsondata);
    for(var i=0; i< jsondata.length; i++)
        values.push([ jsondata[i].name, jsondata[i].dateOfCreate, jsondata[i].contacts]);
    console.log(values);
//Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)

    connection.query('DELETE FROM company WHERE id_company NOT IN (SELECT id_company FROM flights GROUP BY id_company); INSERT INTO company ( name, dateOfCreate, contacts) VALUES ?', [values], function(err,result) {
        if(err) {
            res.send('Error');
            console.log(err);
        }
        else {
            res.send('Success');
        }
    });
});

app.post('/planes/loadFromFile', function(req, res) {

    var jsondata = req.body;
    var values = [];
    console.log(jsondata);
    for(var i=0; i< jsondata.length; i++)
        values.push([jsondata[i].dateOfCreate, jsondata[i].model, jsondata[i].numberOfSeats]);
    console.log(values);
//Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)

    connection.query('DELETE FROM planes WHERE id_plane NOT IN (SELECT id_plane FROM flights GROUP BY id_plane); INSERT INTO planes (dateOfCreate, model, numberOfSeats) VALUES ?', [values], function(err,result) {
        if(err) {
            res.send('Error');
            console.log(err);
        }
        else {
            res.send('Success');
        }
    });
});



app.get('/company/all', function (req,res) {

    connection.query('SELECT * from company', function(err, rows, fields) {
        if (!err){
            var response = [];

            if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
            } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
            }
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});



app.post('/searchByWord', function (req,res) {
    console.log('req.body =');
    console.log(req);
    var response = [],
        field = req.body.field,
        key = req.body.key,
        table = req.body.table;

    if (
        typeof field !== 'undefined' &&
        typeof key !== 'undefined' &&
        typeof table !== 'undefined'
    ) {
        connection.query("SELECT * FROM "+ table +" WHERE MATCH ("+ field +") AGAINST (+'"+key+"' IN BOOLEAN MODE);",
            function(err, rows) {
                if (!err){

                     if (rows.length != 0)  {
                         response.push({'result' : 'success', 'data' : rows});
                    } else {
                        response.push({'result' : 'error', 'msg' : 'No Results Found'});
                    }

                    res.setHeader("Access-Control-Allow-Origin","*");
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(response));
                    console.log(response);
    } else {
    console.log(err);
    res.status(400).send(err);
}
});
    }});

app.post('/searchByFull', function (req,res) {
    console.log(req.body);
    var response = [],
        field = req.body.field,
        key = req.body.key,
        table = req.body.table;

    if (
        typeof field !== 'undefined' &&
        typeof key !== 'undefined' &&
        typeof table !== 'undefined'
    ) {
        connection.query("SELECT * FROM "+ table +" WHERE MATCH ("+ field +") AGAINST ('"+key+"' IN BOOLEAN MODE);",
            function(err , rows) {
                if (!err){

                    if (rows.length != 0)  {
                        response.push({'result' : 'success', 'data' : rows});
                    } else {
                        response.push({'result' : 'error', 'msg' : 'No Results Found'});
                    }

                    res.setHeader("Access-Control-Allow-Origin","*");
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(response));
                    console.log(response);
                } else {
                    console.log(err);
                    res.status(400).send(err);
                }
            });
    }});





app.post('/serchByDate', function (req,res) {
    console.log(req.body);
    var response = [],
        from = req.body.from,
        to = req.body.to;
    table = req.body.table;
    field = req.body.field;

    if (
        typeof from !== 'undefined' &&
        typeof to !== 'undefined'
    ) {
        connection.query('SELECT * FROM ' +table+ ' WHERE '+field+' BETWEEN "'+from+'" AND "'+ to+'"', function(err, rows) {
            if (!err){
                var response = [];

                if (rows.length != 0) {
                    response.push({'result' : 'success', 'data' : rows});
                } else {
                    response.push({'result' : 'error', 'msg' : 'No Results Found'});
                }
                res.setHeader("Access-Control-Allow-Origin","*");
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
                console.log(response);
            } else {
                res.status(400).send(err);
            }
        });};
});



app.post('/searchByBool', function (req,res) {
    console.log(req.body);
    var response = [],
    table = req.body.table;
    field = req.body.field;
    key=req.body.key;

    if (
        typeof table !== 'undefined' &&
        typeof field !== 'undefined' &&
        typeof key !== 'undefined'
    ) {
        connection.query('SELECT * FROM ' +table+ ' WHERE '+field+' = "'+key+'"', function(err, rows) {
            if (!err){
                var response = [];

                if (rows.length != 0) {
                    response.push({'result' : 'success', 'data' : rows});
                } else {
                    response.push({'result' : 'error', 'msg' : 'No Results Found'});
                }
                res.setHeader("Access-Control-Allow-Origin","*");
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
                console.log(response);
            } else {
                res.status(400).send(err);
            }
        });};
});
