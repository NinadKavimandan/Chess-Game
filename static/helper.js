function appendIncoming(data)
{
    var name = data.player;
    var status = data.status;
    var plTab = document.createElement("div");
    if(status==0) {
        plTab.className = "avPl";
        plTab.onclick = function() {sendGameRequest(plTab.id);};
    }
    else {
        plTab.className = "unPl";
        plTab.onclick = function() {return false;}
    }
    plTab.id = name;
    plTab.innerHTML = name;
    document.getElementById("loginBox").appendChild(plTab);
}

function changeStatus(name)
{
    var plTab = document.getElementById(name);
    plTab.className = "unPl";
}

function sendGameRequest(e)
{
    console.log("Sending request");
    var df = {};
    df['name'] = self;
    df['oppo'] = e;
    df['target'] = nameToSid[e];
    socket.emit("sendinvite", JSON.stringify(df));
    var tile = document.getElementById(e);
    tile.className = "waiting";
    tile.onclick = function() {return false;};
}

function updateTiles(e)
{
    var tile = document.getElementById(e);
    tile.className = "waiting";
    tile.onclick = null;
    tile.innerHTML += " wants to play with you!";
    var yup = document.createElement("div");
    yup.id = "yesTile";
    yup.innerHTML = "Yes";
    yup.onclick = function(event) {acceptInvite(e, event);};
    tile.appendChild(yup);
    var nup = document.createElement("div");
    nup.id = "noTile";
    nup.innerHTML = "No";
    nup.onclick = function(event) {rejectInvite(e, event);};
    tile.appendChild(nup);
}

function acceptInvite(e, event)
{
    var df = {};
    df['name'] = self;
    df['oppo'] = e;
    df['target'] = nameToSid[e];
    console.log(df['target']);
    socket.emit("inviteAccpted", JSON.stringify(df));
    event.stopPropagation();
}

function rejectInvite(e, event)
{
    console.log("Informing rejection :(");
    var tile = document.getElementById(e);
    tile.className = "avPl";
    tile.innerHTML = e;
    tile.onclick = function() {sendGameRequest(e);};
    var df = {};
    df['name'] = self;
    df['oppo'] = e;
    df['target'] = nameToSid[e];
    socket.emit("inviteRejected", JSON.stringify(df));
    console.log("Function over");
    event.stopPropagation();
}

function resetTile(e)
{
    var tile = document.getElementById(e);
    tile.className = "avPl";
    tile.onclick = function() {sendGameRequest(e);};
    tile.innerHTML += "  (rejected your invite)";
}