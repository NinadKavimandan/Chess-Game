var socket = io.connect('http://' + document.domain + ':' + location.port);
var ucnt = 0;
var self = "#";
var nameToSid = {};
socket.on("connect", function() {
    socket.emit("connected");
});

socket.on("welcomepl", function(data) {
    data = JSON.parse(data);
    console.log("Welcome");
    if(self == "#") self = data.player;
});
socket.on("newjoinee", function(data) {
    data = JSON.parse(data);
    ucnt++;
    console.log("Current user count: "+ucnt);
    console.log("Self = "+self);
    if(self != data.player) 
    {
        nameToSid[data.player] = data.target;
        appendIncoming(data);
        socket.emit("sendmyinfo", data);
    }
    //if(ucnt == 2) socket.emit("ready");
});

socket.on("incomingInvite", function(data) {
    data = JSON.parse(data);
    updateTiles(data.name);
});

socket.on("updatePlList", function(data) {
    data = JSON.parse(data)
    nameToSid[data.player] = data.target;
    appendIncoming(data);
});

socket.on("accepted", function(data) {
    data = JSON.parse(data);
    console.log("Here");
    connectToBoard(data.name, data.oppo, data.col, data.room, data.url);    
});

socket.on("rejected", function(data) {
    data = JSON.parse(data);
    resetTile(data.name);
});

socket.on("updateStatus", function(data) {
    data = JSON.parse(data);
    if(self != data['name']) disableTab(data['name']);
    if(self != data['oppo']) disableTab(data['oppo']);
});

function connectToBoard(name, opponent, col, room, url)
{
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.name = "data";
    form.style.display = "none";
    document.body.appendChild(form);
    form.action = url;
    var nameIP = document.createElement("input");
    var oppIP = document.createElement("input");
    var colIP = document.createElement("input");
    var roomIP = document.createElement("input");
    nameIP.type = "hidden";
    oppIP.type = "hidden";
    colIP.type = "hidden";
    roomIP.type = "hidden";
    nameIP.name = "name";
    oppIP.name = "opponent";
    colIP.name = "col";
    roomIP.name = "room";
    nameIP.value = name;
    oppIP.value = opponent;
    colIP.value = col;
    roomIP.value = room;
    form.appendChild(nameIP);
    form.appendChild(oppIP);
    form.appendChild(colIP);
    form.appendChild(roomIP);
    form.submit();
}
socket.on("beginGame", function(data) {
    var self, opponent, col, room, url;
    data = JSON.parse(data);
    url = data.url;
    room = data.room;
    if(ucnt == 1)
    {
      self = data.opponent;
      opponent = data.name;
      col = 1-data.selfCol;
    }
    else {
      self = data.name;
      opponent = data.opponent;
      col = data.selfCol;
    }
    connectToBoard(self, opponent, col, room, url);
});