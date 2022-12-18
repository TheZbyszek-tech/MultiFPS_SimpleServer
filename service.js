sbl = require('./sbl')
const config = require('config')

var currentClient;
var bootingGame = false;



CreateGame = async (req, res) => {

    if(bootingGame) return;
    bootingGame = true;

    currentClient = {
        Req: req,
        Res: res,
    }

    BootServerBuild(req, res);
}

BootServerBuild = (req, res) => {
    console.log("Delivering game for client on: "+req.ip)
    sbl.runServerBuild(req.body.Port, req)
}

OnGameBooted = async() =>
{
    bootingGame = false;

    var connectDataForClient = 
    {
        "Address": config.get("server.host"),
        "Port": currentClient.Req.body.Port,
    }

    currentClient.Res.status(202).send(connectDataForClient);

    console.log("Game started on port "+currentClient.Req.body.Port +"and is ready to be connected to");

    currentClient = null;
}

module.exports = {
    CreateGame,
    OnGameBooted,
}