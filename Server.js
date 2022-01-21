const WebSocket = require('ws'); //get WebSocket from socket
const sws = new WebSocket.Server({ port: 3333 },()=>{ //open port, start new server  
    console.log('StartServer!!') 
}); 

let clientNum = 0; //number of connected clients 
const clientId = []; //client Id saved
let horseLocation ={};
let resultSpeed=0;
const timeBalance=0.01;
let rotateTime = 0;
let isDiagonal = false;
let isHalf = false;
let position = { //
   x: 39,
   y: 0,
   z: -13
};
const rPoint1 = 30;
const rPoint2 = -15;
const dPoint1 = 19.75;
const dPoint2 = -4.75;
const clientHorse = [
   {
      speed: 0,
      accel: 0,
      hp: 0,
      agility: 0,
      consis: 0
   }
   /*{
      speed: 0,
      accel: 0,
      hp: 0,
      agility: 0,
      consis: 0
   }
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
   }*/
]; //client horse info
let resGStart = false;

sws.on('connection', function connection(client) { //if server is connected run function
    client.on('message', (data) => {  //if server got a message from client, run function (data) is a data from client

      if(String(data).substring(0,2) === "id"){
         clientId.push(String(data).substring(3,String(data).length));
         console.log(`player${clientId[clientNum]}Entered!!`);
         client.send(`player${clientId[clientNum]}Entered!!`);
      }
      
      if(String(data).substring(0,2) === "hd"){
         const hd = String(data).split(",");  
         clientHorse[clientNum].speed = Number(hd[1]);
         clientHorse[clientNum].accel = Number(hd[2]);
         clientHorse[clientNum].hp = Number(hd[3]);
         clientHorse[clientNum].agility = Number(hd[4]);
         clientHorse[clientNum].consis = Number(hd[5]);
   
         clientNum += 1;

         if(clientNum == 1){
            resGStart = true;
         }
         if(resGStart === true){
            client.send("GameStart"); //request to start game
            clientNum = 0;
            resGStart = false;
            console.log(clientId);
            console.log(clientHorse);
            //setInterval(() => client.send("hihi"), 100);
        }
      }
   }) 
}) 

function ApplyConsis()
{
    let consisValue = 0;
    switch (floor(clientHorse[clientNum].consis) / 20)
    {
        case 0:
            consisValue = (Math.Random() * (1.1 - 0.7)) + 0.7;
            break;

        case 1:
            consisValue = (Math.Random() * (1.1 - 0.75)) + 0.75;
            break;

        case 2:
            consisValue = (Math.Random() * (1.1 - 0.8)) + 0.8;
            break;

        case 3:
            consisValue = (Math.Random() * (1.1 - 0.85)) + 0.85;
            break;

        case 4:
            consisValue = (Math.Random() * (1.15 - 0.9)) + 0.9;
            break;
        case 5:
            consisValue = (Math.Random() * (1.15 - 0.95)) + 0.95;
            break;
    }
    clientHorse[clientNum].accel *= consisValue;
    clientHorse[clientNum].agility *= consisValue;
    clientHorse[clientNum].hp *= consisValue;
    clientHorse[clientNum].speed *= consisValue;
}
function InputLocation()
{
   horseLocation["First"] = true;
   horseLocation["Second"] = false;
   horseLocation["Third"] = false;
   horseLocation["Fourth"] = false;
   horseLocation["Final"] = false;
}
function CalculateSpeed()
    {
        timeChecker += 10 * timeBalance;
        if (horseLocation["First"])
        {
            resultSpeed = clientHorse[clientNum].speed + (clientHorse[clientNum].accel / 100) * timeChecker;
        }
        else if (horseLocation["Second"])
        {
            resultSpeed = clientHorse[clientNum].speed + (clientHorse[clientNum].accel / 100) * timeChecker;
            switch (floor(clientHorse[clientNum].agility) / 20)
            {
                case 0:
                    resultSpeed = resultSpeed * (0.5 * (statclientHorse[clientNum].agility / 20));
                    break;

                case 1:
                    resultSpeed = resultSpeed * (0.625 * (clientHorse[clientNum].agility / 20));
                    break;

                case 2:
                    resultSpeed = resultSpeed * (0.75 * (clientHorse[clientNum].agility / 20));
                    break;

                case 3:
                    resultSpeed = resultSpeed * (0.875 * (clientHorse[clientNum].agility / 20));
                    break;

                case 5:
                case 4:
                    resultSpeed = resultSpeed * (1 * (clientHorse[clientNum].agility / 20));
                    break;
            }
        }
        else if (horseLocation["Third"])
        {
            if (((100 - clientHorse[clientNum].hp) / 100 * timeChecker) <= clientHorse[clientNum].speed / 2)
                resultSpeed = clientHorse[clientNum].speed - ((100 - clientHorse[clientNum].hp) / 100 * timeChecker);
            else if (((100 - clientHorse[clientNum].hp) / 100 * timeChecker) > clientHorse[clientNum].speed / 2)
                resultSpeed = clientHorse[clientNum].speed / 2;
        }
        else if (horseLocation["Fourth"])
        {
            if (((100 - clientHorse[clientNum].hp) / 100 * timeChecker) <= clientHorse[clientNum].speed / 2)
                resultSpeed = clientHorse[clientNum].speed - ((100 - clientHorse[clientNum].hp) / 100 * timeChecker);
            else if (((100 - clientHorse[clientNum].hp) / 100 * timeChecker) > clientHorse[clientNum].speed / 2)
                resultSpeed = clientHorse[clientNum].speed / 2;

            switch (floor(clientHorse[clientNum].hp) / 20)
            {
                case 0:
                    resultSpeed = resultSpeed * (0.5 * (clientHorse[clientNum].agility / 15));
                    break;

                case 1:
                    resultSpeed = resultSpeed * (0.625 * (clientHorse[clientNum].agility / 15));
                    break;

                case 2:
                    resultSpeed = resultSpeed * (0.75 * (clientHorse[clientNum].agility / 15));
                    break;

                case 3:
                    resultSpeed = resultSpeed * (0.875 * (clientHorse[clientNum].agility / 15));
                    break;

                case 5:
                case 4:
                    resultSpeed = resultSpeed * (1 * (clientHorse[clientNum].agility / 15));
                    break;
            }
        }
        resultSpeed = ((resultSpeed) / 10) + 1;
    }

    function Run()
    {
        let currentPosition = position;
        CalculateSpeed();
        if (currentPosition.z >= rPoint1 && !isRotate && horseLocation["First"]) // 커브길 시작
        {
            horseLocation["First"] = false;
            horseLocation["Second"] = true;
            isRotate = true;
            isDiagonal = false;
            radius = Vector3.Distance(currentPosition, firstAxis);
            startPosition = currentPosition;
        }
        else if (currentPosition.z <= rPoint2 && !isRotate && horseLocation["Third"])
        {
            horseLocation["Third"] = false;
            horseLocation["Fourth"] = true;
            isRotate = true;
            isDiagonal = false;
            radius = Vector3.Distance(currentPosition, secondAxis);
            startPosition = currentPosition;

        }
        else if (isRotate && (horseLocation["Second"] || horseLocation["Fourth"]))
        {
            Rotate();
        }
        //여기뷰터
        else if (currentPosition.z >= rPoint2 && currentPosition.z <= rPoint1 && horseLocation["First"]) // 직선 코스
        {
            if (isDiagonal) // 대각선 주행 
            {
               //  transform.position = Vector3.MoveTowards(currentPosition,
               //                              new Vector3(dRandom, currentPosition.y, rPoint1), 4.5f * resultSpeed * Time.deltaTime);
                position.x = currentPosition.x + resultSpeed * timeBalance * 2;
                position.y = currentPosition.y;
                position.z = currentPosition.z + resultSpeed * timeBalance * 3.5;
            }
            else if (currentPosition.z >= dPoint1 && !isDiagonal)
            {
                isDiagonal = true;
                dRandom = (Math.Random() *(currentPosition.x- 34))+34;
            }
            else
            {
               //  transform.position = Vector3.MoveTowards(currentPosition,
               //                              new Vector3(currentPosition.x, currentPosition.y, rPoint1), 5f * resultSpeed * Time.deltaTime);
                rotateTime = 0;

                position.x = currentPosition.x;
                position.y = currentPosition.y;
                position.z = currentPosition.z + resultSpeed * timeBalance * 5;
            }
            //ApplyRotate();
        }
        else if (currentPosition.z >= rPoint2 && currentPosition.z <= rPoint1 && horseLocation["Third"])
        {
            if (isDiagonal)
            {
               //  transform.position = Vector3.MoveTowards(currentPosition,
               //                              new Vector3(dRandom, currentPosition.y, rPoint2), 4.5f * resultSpeed * Time.deltaTime);
               position.x = currentPosition.x - resultSpeed * timeBalance * 2;
               position.y = currentPosition.y;
               position.z = currentPosition.z - resultSpeed * timeBalance * 3.5;
            }
            else if (currentPosition.z <= dPoint2 && !isDiagonal)
            {
                isDiagonal = true;
                dRandom = (Math.Random() *(currentPosition.x- 4))+4;
            }
            else
            {
                isHalf = true;
                rotateTime = 0;

                position.x = currentPosition.x;
                position.y = currentPosition.y;
                position.z = currentPosition.z - resultSpeed * timeBalance * 5;
            }
        }
        //여기까지
        else if (horseLocation["Final"])
        {
            transform.position = Vector3.MoveTowards(currentPosition,
                                        finalPosition, 5 * resultSpeed * Time.deltaTime);
            animator.Play("Horse_Trot");
            if (transform.position == finalPosition)
            {
                horseLocation["Final"] = false;
            }
        }
        else
        {
            animator.Play("Horse_Paw2");
        }
    }

sws.on('listening',()=>{  //if server is opened and running, run function
   console.log(`Listening...`) 
})

const os = require('os'); //get os from socketconst { time } = require('console');

