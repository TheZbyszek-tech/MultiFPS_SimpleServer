/* DESNETWARE.NET */

const config = require('config')

//create app
const express = require('express')
const app = express()


//this is here in order to not block web requests from unity client builds
const cors = require('cors'); 
app.use(cors());
app.options('*', cors());


// Allows to parse whole json trough URL. Without it app can't read request body.
const bp = require('body-parser');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true })) 


//setup endpoint that we will send data to from client build of MultiFPS
const service = require('./service')
app.post('/multifps/createGame', service.CreateGame)

app.get('/multifps/gameBooted', service.OnGameBooted)

const port = config.get('server.port');
const host = config.get('server.host');

//start app
app.listen(port, host)
console.log(`Started game server on ${host}:${port}`);
