var socket = io.connect('http://' + document.domain + ':' + location.port);
var ucnt = 0;
socket.on("connect", function() {
    socket.emit("connected");
});
socket.on("newjoinee", function(data) {
    data = JSON.parse(data);
    ucnt++;
    console.log("Current user count: "+ucnt);
    appendIncoming(data.player);
    if(ucnt == 2) socket.emit("ready");
});
socket.on("pairPlayer", function(data) {
    console.log("Received data: "+String(data));
    data = JSON.parse(data);
    if(ucnt == 1) socket.emit("pairFound", data);
});
socket.on("fetchOpponent", function(data) {
    if(ucnt == 2) socket.emit("fetched", data);
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