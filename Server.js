const WebSocket = require('ws'); //get WebSocket from socket
const sws = new WebSocket.Server({ port: 3333 },()=>{ //open port, start new server  
    console.log('StartServer!!') 
}); 

let clientNum = 0; //number of connected clients 
const clientId = []; //client Id saved
const clientHorse = [
   {
      level: 0,
      speed: 0,
      accel: 0,
      hp: 0,
      agility: 0,
      consis: 0
   },
   {
      level: 0,
      speed: 0,
      accel: 0,
      hp: 0,
      agility: 0,
      consis: 0
   },
   {
      level: 0,
      speed: 0,
      accel: 0,
      hp: 0,
      agility: 0,
      consis: 0
   },
   {
      level: 0,
      speed: 0,
      accel: 0,
      hp: 0,
      agility: 0,
      consis: 0
   }
]; //client horse info
let resGStart = false;

sws.on('connection', function connection(client) { //if server is connected run function
    client.on('message', (data) => {  //if server got a message from client, run function (data) is a data from client

      if(String(data).substring(0,2) === "id"){
         clientId.push(String(data).substring(3,7));
         console.log(`player${clientId[clientNum]}Entered!!`);
         client.send(`player${clientId[clientNum]}Entered!!`);
      }
      if(String(data).substring(0,2) === "hd"){
         clientHorse[clientNum].level = Number(String(data).substring(3,4));
         clientHorse[clientNum].speed = Number(String(data).substring(4,5));
         clientHorse[clientNum].accel = Number(String(data).substring(5,6));
         clientHorse[clientNum].hp = Number(String(data).substring(6,7));
         clientHorse[clientNum].agility = Number(String(data).substring(7,8));
         clientHorse[clientNum].consis = Number(String(data).substring(8,9));
 
         clientNum += 1;

         if(clientNum > 3){
            resGStart = true;
         }
         if(resGStart === true){
           //client.send("GameStart"); //request to start game
           clientNum = 0;
           resGStart = false;
           console.log(clientId);
           console.log(clientHorse);
           setInterval(() => client.send("hihi"), 100);
        }


      }
   }) 
}) 

sws.on('listening',()=>{  //if server is opened and running, run function
   console.log(`Listening...`) 
})

const os = require('os'); //get os from socket
