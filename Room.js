const roomMk = (clientNum) => {
    if(clientNum > 3){ //client num check
        console.log("4PlayerComplete");
        console.log("GameStart!!");
        return true;
    }
}

module.exports = roomMk;