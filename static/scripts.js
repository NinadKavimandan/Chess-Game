var socket = io.connect('http://' + document.domain + ':' + location.port);

window.onload = function() {
	var width = $("#board").innerWidth();
	$("#black").css({'width': width + 'px'});
	$("#white").css({'width': width + 'px'});
	$("#result").css({'width': width + 'px'});
	initBoard();
}
window.onresize = function() {
	var width = $("#board").innerWidth();
	$("#board").css({'height': width + 'px'});
	$("#black").css({'width': width + 'px'});
	$("#white").css({'width': width + 'px'});
	$("#result").css({'width': width + 'px'});
	rePosition();
}

var self = "#";
var mcol = 0;
socket.on("connect", function() {
	socket.emit("connectedToBoard");
});

socket.on("welcome", function(data) {
	if(self == "#")
	{
		data = JSON.parse(data);
		self = data.name;
		mcol = data.col;
	}
});

function informOtherUser(query, element)
{
	socket.emit("nextMove", {"query": query, "player": self, "piece": element});
}

socket.on("incomingMove", function(data) {
	data = JSON.parse(data);
	if(data.player != self)
	{
		queryExecutor(data.query, data.piece);
		turn = 1-turn;
		if(isCheck(data.piece, turnColr[1-turn]))
		{
			console.log(""+kingName[turn]+" under check!");
			if(isCheckmate(turnColr[1-turn])) 
			{
				displayWinnerTab(turn);
				return;
			}
		}
		turn = 1-turn;
		if(turn==0) {
			p1 = "whitepl";
			p2 = "blackpl";
		}
		else {
			p1 = "blackpl";
			p2 = "whitepl";
		}
		$('#'+p1).css({'color':'blue'});
		$('#'+p2).css({'color':'black'});
		//socket.emit("queryExec");
	}
});

// socket.on("alterState", function(data) {
// 	data = JSON.parse(data);
// 	alert(self+" "+data.name);
// 	if(self != data.name)
// 	{
// 		turn=1-turn;
// 		if(turn==0) {
// 			p1 = "whitepl";
// 			p2 = "blackpl";
// 		}
// 		else {
// 			p1 = "blackpl";
// 			p2 = "whitepl";
// 		}
// 		$('#'+p1).css({'color':'blue'});
// 		$('#'+p2).css({'color':'black'});
// 	}
// });
