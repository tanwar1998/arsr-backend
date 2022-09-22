require('./models/db');

const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');

const employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const corsOptions = {
	credentials: true,
	origin: true,
};
app.use(cors(corsOptions));

app.listen(3001, () => {
    console.log('Express server started at port : 3001');
});

app.use('/employee', employeeController);