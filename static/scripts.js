var rows = ['1','2','3','4','5','6','7','8'];
var cols = ['a','b','c','d','e','f','g','h'];
var colr = ['#FFFFFF','#32CD32'];
var allowedCells = [];
var castledCells = [];
var isCastle = false;
var pawnMove = [-1,1];
var turn = 0;
var playerColr = ["White","Black"];
var turnColr = ["w","b"];
var kingName = ["Black King","White King"];
var wp = ["../static/80/wr.PNG","../static/80/wn.PNG","../static/80/wb.PNG","../static/80/wq.PNG","../static/80/wk.PNG","../static/80/wp.PNG"];
var bp = ["../static/80/br.PNG","../static/80/bn.PNG","../static/80/bb.PNG","../static/80/bq.PNG","../static/80/bk.PNG","../static/80/bp.PNG"];
var cellNum  = [];
var killedPiece = {
	bp1:'#',
	bp2:'#',
	bp3:'#',
	bp4:'#',
	bp5:'#',
	bp6:'#',
	bp7:'#',
	bp8:'#',
	br1:'#',
	bn1:'#',
	bb1:'#',
	bq:'#',
	bk:'#',
	bb2:'#',
	bn2:'#',
	br2:'#',
	wp1:'#',
	wp2:'#',
	wp3:'#',
	wp4:'#',
	wp5:'#',
	wp6:'#',
	wp7:'#',
	wp8:'#',
	wr1:'#',
	wn1:'#',
	wb1:'#',
	wq:'#',
	wk:'#',
	wb2:'#',
	wn2:'#',
	wr2:'#'
};
var pics = ["/static/80/wr.PNG","../static/80/wn.PNG","../static/80/wb.PNG","../static/80/wq.PNG","../static/80/wk.PNG","../static/80/wp.PNG","../static/80/br.PNG","../static/80/bn.PNG","../static/80/bb.PNG","../static/80/bq.PNG","../static/80/bk.PNG","../static/80/bp.PNG"];
var pieceLoc = {
	bp1:'a2',
	bp2:'b2',
	bp3:'c2',
	bp4:'d2',
	bp5:'e2',
	bp6:'f2',
	bp7:'g2',
	bp8:'h2',
	br1:'a1',
	bn1:'b1',
	bb1:'c1',
	bq:'d1',
	bk:'e1',
	bb2:'f1',
	bn2:'g1',
	br2:'h1',
	wp1:'a7',
	wp2:'b7',
	wp3:'c7',
	wp4:'d7',
	wp5:'e7',
	wp6:'f7',
	wp7:'g7',
	wp8:'h7',
	wr1:'a8',
	wn1:'b8',
	wb1:'c8',
	wq:'d8',
	wk:'e8',
	wb2:'f8',
	wn2:'g8',
	wr2:'h8'
};
var piecePic = {
	bp1:'11',
	bp2:'11',
	bp3:'11',
	bp4:'11',
	bp5:'11',
	bp6:'11',
	bp7:'11',
	bp8:'11',
	br1:'6',
	bn1:'7',
	bb1:'8',
	bq:'9',
	bk:'10',
	bb2:'8',
	bn2:'7',
	br2:'6',
	wp1:'5',
	wp2:'5',
	wp3:'5',
	wp4:'5',
	wp5:'5',
	wp6:'5',
	wp7:'5',
	wp8:'5',
	wr1:'0',
	wn1:'1',
	wb1:'2',
	wq:'3',
	wk:'4',
	wb2:'2',
	wn2:'1',
	wr2:'0'
}; 
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
	//initBoard();
	rePosition();	
}
function initBoard() {
	var board = document.getElementById("board");
	var width = $("#board").innerWidth();
	$("#board").css({'height': width + 'px'});
	var i=0;
	var j=0;
	var cellCount = 0;
	var boardData = "";
	while(i<8)
	{
		while(j<8)
		{
			//console.log(""+cols[i]+""+rows[j]+"  "+findPiece(""+cols[i]+""+rows[j]));	
			var cell = ""+cols[j]+rows[7-i];
			var piece = findPiece(cell);
			if(piece != "none")
				boardData += "<div class='cell' id='"+cell+"' style='background-color: "+colr[cellCount%2]+"'><img src="+pics[piecePic[piece]]+" id='"+piece+"' class='pieces'></div>";
			else boardData += "<div class='cell' id='"+cell+"' style='background-color: "+colr[cellCount%2]+"'></div>";
			cellCount++;
			j++;
		}
		i++;
		cellCount++;
		j=0;
	}
	board.innerHTML = boardData;
	var element = "";
	$('.pieces').draggable({
		revert: "invalid",
		containment: "#board",
		start: function(event) {
			allowedCells = [];
			castledCells = [];
			element = event.target.id;
			//console.log(""+element);
			if(element.substring(0,1) != turnColr[turn]) return false;
			var p = element.substring(1,2);
			var currCell = pieceLoc[element];
			allowedCells.push(currCell);
			//console.log("Current cell="+currCell);
			var r = cols.indexOf(currCell.substring(0,1));
			var c = rows.indexOf(currCell.substring(1,2));
			document.getElementById(currCell).style.backgroundColor = "yellow";
			isCastle = false;
			switch(p)
			{
				case "n":
					horsePath(currCell,r,c);
					break;
				case "b":
					crossPath(pieceLoc[element]);
					break;
				case "p":
					if(c == 1 && turn == 1)
					{
						var cell1 = cols[r]+"3";
						var cell2 = cols[r]+"4";
						var cell3 = cols[r+1]+"3";
						var cell4 = cols[r-1]+"3";
						if(r+1 < 8)
						{
							if(findPiece(cell3).substring(0,1) == turnColr[1-turn])
							{
								allowedCells.push(cell3);
								//document.getElementById(cell3).style.backgroundColor = "yellow";
							}
						}
						if(r-1 > -1)
						{
							if(findPiece(cell4).substring(0,1) == turnColr[1-turn])
							{
								allowedCells.push(cell4);
								//document.getElementById(cell4).style.backgroundColor = "yellow";
							}
						}
						if(findPiece(cell1) == "none") 
						{
							allowedCells.push(cell1);
							//document.getElementById(cell1).style.backgroundColor = "yellow";
							if(findPiece(cell2) == "none")
							{
								allowedCells.push(cell2);
								//document.getElementById(cell2).style.backgroundColor = "yellow";
							}
						}
					}
					else if(c == 6 && turn == 0)
					{
						var cell1 = cols[r]+"6";
						var cell2 = cols[r]+"5";
						var cell3 = cols[r+1]+"6";
						var cell4 = cols[r-1]+"6";
						if(r+1 < 8)
						{
							if(findPiece(cell3).substring(0,1) == turnColr[1-turn])
							{
								allowedCells.push(cell3);
								//document.getElementById(cell3).style.backgroundColor = "yellow";
							}
						}
						if(r-1 > -1)
						{
							if(findPiece(cell4).substring(0,1) == turnColr[1-turn])
							{
								allowedCells.push(cell4);
								//document.getElementById(cell4).style.backgroundColor = "yellow";
							}
						}
						if(findPiece(cell1) == "none") 
						{
							allowedCells.push(cell1);
							//document.getElementById(cell1).style.backgroundColor = "yellow";
							if(findPiece(cell2) == "none")
							{
								allowedCells.push(cell2);
								//document.getElementById(cell2).style.backgroundColor = "yellow";	
							}
						}
					}
					else {
						var cell1 = cols[r]+rows[c+pawnMove[turn]];
						var cell3 = cols[r+1]+rows[c+pawnMove[turn]];
						var cell4 = cols[r-1]+rows[c+pawnMove[turn]];
						if(r+1 < 8)
						{
							console.log(""+cell3);
							if(findPiece(cell3).substring(0,1) == turnColr[1-turn])
							{
								allowedCells.push(cell3);
								//document.getElementById(cell3).style.backgroundColor = "yellow";
							}
						}
						if(r-1 > -1)
						{
							if(findPiece(cell4).substring(0,1) == turnColr[1-turn])
							{
								allowedCells.push(cell4);
								//document.getElementById(cell4).style.backgroundColor = "yellow";
							}
						}
						if(findPiece(cell1) == "none")
						{
							allowedCells.push(cell1);
							//document.getElementById(cell1).style.backgroundColor = "yellow";
						}
					}
					console.log(""+allowedCells);
					break;
				case "r":
					traversePath(pieceLoc[element],r,c,1,0);
					traversePath(pieceLoc[element],r,c,-1,0);
					traversePath(pieceLoc[element],r,c,0,1);
					traversePath(pieceLoc[element],r,c,0,-1);
					break;
				case "q":
					traversePath(pieceLoc[element],r,c,1,0);
					traversePath(pieceLoc[element],r,c,-1,0);
					traversePath(pieceLoc[element],r,c,0,1);
					traversePath(pieceLoc[element],r,c,0,-1);
					crossPath(pieceLoc[element]);
					break;
				case "k": 
					kingPath(currCell,r,c);
					break;
			}
		},
		stop: rePaint
	});
	$('.cell').droppable({
		accept: function(event) {
			var place = this.id;
			var color = document.getElementById(place).style.backgroundColor;	
			if(allowedCells.indexOf(place) != -1)
			{
				var oldPlace = pieceLoc[element];
				var oldPiece = findPiece(place);
				pieceLoc[element] = place;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[turn%2])) 
				{
					pieceLoc[oldPiece] = place;
					pieceLoc[element] = oldPlace;
					if(castledCells.indexOf(place) != -1)
					{
						if(!selfCheck(turnColr[turn%2])) return true;
						else return false;	
					}
					return true;
				}
				pieceLoc[oldPiece] = place;
				pieceLoc[element] = oldPlace;
			}
			return false;
		},
		drop: function(event,ui) {
			var piece = event.target.id;
			var place = this.id;
			//queryExecutor(""+place);
			if(findPiece(place) != element) killIt(place);
			else turn++;
			pieceLoc[element] = place;
			if(castledCells.indexOf(place) != -1) execCastle(turnColr[turn]);
			//console.log("Status="+event.reverted);
			rePaint();
			if(isCheck(element,turnColr[1-turn])) 
			{
				console.log(""+kingName[turn]+" under check!");
				if(isCheckmate(turnColr[1-turn])) 
				{
					document.getElementById("result").innerHTML = "<b>"+playerColr[turn]+" won!</b>";
					console.log("Checkmate!");
				}
			}
			turn++;
			turn%=2;
			ui.draggable.position({
				my: "center",
				at: "center",
				of: $(this),
				using: function(pos) {
					$(this).animate(pos,200,"linear");
				}
			});
		}	
	});
}
function findPiece(val)
{
	for(i in pieceLoc)
	{
		if(pieceLoc[i] == val) return i;
	}
	return "none";
}
function rePaint()
{
	var i=0;
	var j=0;
	var cellCount=0;
	while(i<8)
	{
		while(j<8)
		{
			var cell = cols[j]+rows[7-i];
			document.getElementById(cell).style.backgroundColor = colr[cellCount%2];
			j++;
			cellCount++;
		}
		i++;
		j=0;
		cellCount++;
	}
}
function execCastle(targetColr)
{
	var rook = ""+targetColr+"r2";
	var rookPos = pieceLoc[rook];
	var row = rows.indexOf(rookPos.substring(1,2));
	var finalPos = "f"+rows[row];
	pieceLoc[rook] = finalPos;
	var leftCor = $("#"+finalPos).position().left - $("#"+rook).position().left;
	console.log(""+leftCor);
	$("#"+rook).animate({left: leftCor},200);
}
function rePosition()
{
	for(var piece in pieceLoc)
	{
		if(pieceLoc.hasOwnProperty(piece) && piece != "" && piece != "none")
		{
			$("#"+piece).position({
				of: $("#"+pieceLoc[piece]),
				my: "center",
				at: "center",
				using: function(pos) {
					$(this).animate(pos,50,"linear");
				}
			});
		}
	}
}