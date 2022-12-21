//sbl for server build launcher
const config = require('config')

const console = require('console');
var exec = require('child_process').execFile;
        
//read from config
const matchmakingServerAddress = config.get('server.matchmakingServerAddress');
const matchmakingAppPort = config.get('server.port');
const buildExecutableName = config.get('server.executableName');

runServerBuild = function(buildPort, userPreferences){

   //parameters that server build will read and apply
   var parameters = [`server ${buildPort} ${JSON.stringify(userPreferences.body)}`, `setupWebRequests ${matchmakingServerAddress}:${matchmakingAppPort}`]; //server

   exec(`./build/${buildExecutableName}`, parameters, {maxBuffer: 1024 * 500}, function(err, data) {
         if(err) throw err;

         console.log(`Launched server instance on port ${buildPort}`);                    
   });  
}

module.exports = {
   runServerBuild,
} 