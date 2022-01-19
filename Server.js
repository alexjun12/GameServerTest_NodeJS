const rsv = require('./Room.js');

const WebSocket = require('ws'); //get WebSocket from socket
const sws = new WebSocket.Server({ port: 3333 },()=>{ //open port, start new server  
    console.log('StartServer!!') 
}); 

const horseInfo = {
   level: 0,
   speed: 0,
   accel: 0,
   hp: 0,
   agility: 0,
   consis: 0
}

let clientNum = 0; //number of connected clients 
const clientId = []; //client Id saved

sws.on('connection', function connection(client) { //if server is connected run function
    client.on('message', (data) => {  //if server got a message from client, run function (data) is a data from client

      if(String(data).substring(0,2) === "id"){
         clientNum += 1;
         clientId.push(String(data).substring(3,7));
         console.log(`player${clientId[clientNum - 1]}Entered!!`);
      }
      let resGStart = rsv(clientNum); // add clientNum to room
      if(resGStart === true){
        client.send("GameStart"); //request to start game
        clientNum = 0;
        resGStart = false;
     }
     
      if(String(data).substring(0,2) === "hd"){
        horseInfo.level = Number(String(data).substring(3,4));
        horseInfo.speed = Number(String(data).substring(4,5));
        horseInfo.accel = Number(String(data).substring(5,6));
        horseInfo.hp = Number(String(data).substring(6,7));
        horseInfo.agility = Number(String(data).substring(7,8));
        horseInfo.consis = Number(String(data).substring(8,9));

        console.log(horseInfo);

        client.send(String(horseInfo.level + horseInfo.speed));
      }
   }) 
}) 

sws.on('listening',()=>{  //if server is opened and running, run function
   console.log(`Listening...`) 
})

const os = require('os'); //get os from socket
