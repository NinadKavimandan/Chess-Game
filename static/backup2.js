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
var wp = ["./merida/merida/80/wr.PNG","./merida/merida/80/wn.PNG","./merida/merida/80/wb.PNG","./merida/merida/80/wq.PNG","./merida/merida/80/wk.PNG","./merida/merida/80/wp.PNG"];
var bp = ["./merida/merida/80/br.PNG","./merida/merida/80/bn.PNG","./merida/merida/80/bb.PNG","./merida/merida/80/bq.PNG","./merida/merida/80/bk.PNG","./merida/merida/80/bp.PNG"];
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
var pics = ["./merida/merida/80/wr.PNG","./merida/merida/80/wn.PNG","./merida/merida/80/wb.PNG","./merida/merida/80/wq.PNG","./merida/merida/80/wk.PNG","./merida/merida/80/wp.PNG","./merida/merida/80/br.PNG","./merida/merida/80/bn.PNG","./merida/merida/80/bb.PNG","./merida/merida/80/bq.PNG","./merida/merida/80/bk.PNG","./merida/merida/80/bp.PNG"];
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
function queryExecutor(query) {
	var pos = query.substring(query.length-2,query.length);
	var loc = findCell(pos);
	var pieceName = query.substring(0,1);
	console.log("$"+pos);
}
function findCell(pos) {
	return cellNum[""+pos];
}
function crossPath(currCell)
{
	//console.log("*"+currCell);
	var r = cols.indexOf(currCell.substring(0,1));
	var c = rows.indexOf(currCell.substring(1,2));
	traversePath(currCell,r,c,1,1);
	traversePath(currCell,r,c,-1,1);
	traversePath(currCell,r,c,1,-1);
	traversePath(currCell,r,c,-1,-1);
}
function traversePath(currCell,r,c,inr,inc)
{
	document.getElementById(currCell).style.backgroundColor = "yellow";
	var l = [""+currCell];
	r+=inr;
	c+=inc;
	while(r<8 && r>-1 && c<8 && c>-1)
	{
		var cell = cols[r]+rows[c];
		var t = findPiece(cell);
		if(t != "none") 
		{
			//console.log("$#"+t);
			var top = t.substring(0,1);
			if(top == turnColr[1-turn]) 
			{
				allowedCells.push(cell);
				console.log(""+allowedCells);
				//document.getElementById(cell).style.backgroundColor = "yellow";
			}
			var targetKing = turnColr[1-turn]+"k";
			break;
		}
		l.push(cell);
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
		r+=inr;
		c+=inc;
		//console.log("*"+l);
	}
	//console.log("#"+l);
}
function horsePath(currCell,r,c)
{
	if(r+2 < 8 && c+1 < 8 && (findPiece(cols[r+2]+rows[c+1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r+2]+rows[c+1]) == "none")) 
	{
		var cell = cols[r+2]+rows[c+1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r+2 < 8 && c-1 >= 0 && (findPiece(cols[r+2]+rows[c-1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r+2]+rows[c-1]) == "none"))
	{
		var cell = cols[r+2]+rows[c-1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r-2 >= 0 && c+1 < 8 && (findPiece(cols[r-2]+rows[c+1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r-2]+rows[c+1]) == "none"))
	{
		var cell = cols[r-2]+rows[c+1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r-2 >= 0 && c-1 >= 0 && (findPiece(cols[r-2]+rows[c-1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r-2]+rows[c-1]) == "none"))
	{
		var cell = cols[r-2]+rows[c-1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r+1 < 8 && c+2 < 8 && (findPiece(cols[r+1]+rows[c+2]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r+1]+rows[c+2]) == "none"))
	{
		var cell = cols[r+1]+rows[c+2];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r+1 < 8 && c-2 >= 0 && (findPiece(cols[r+1]+rows[c-2]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r+1]+rows[c-2]) == "none"))
	{
		var cell = cols[r+1]+rows[c-2];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r-1 >= 0 && c+2 < 8 && (findPiece(cols[r-1]+rows[c+2]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r-1]+rows[c+2]) == "none"))
	{
		var cell = cols[r-1]+rows[c+2];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r-1 >= 0 && c-2 >= 0 && (findPiece(cols[r-1]+rows[c-2]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r-1]+rows[c-2]) == "none"))
	{
		var cell = cols[r-1]+rows[c-2];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
}
function kingPath(currCell,r,c)
{
	castling(turnColr[turn]);
	if(r+1 < 8 && c+1 < 8 && (findPiece(cols[r+1]+rows[c+1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r+1]+rows[c+1]) == "none"))
	{
		var cell = cols[r+1]+rows[c+1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r+1 < 8 && c-1 >= 0 && (findPiece(cols[r+1]+rows[c-1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r+1]+rows[c-1]) == "none"))
	{
		var cell = cols[r+1]+rows[c-1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r-1 >= 0 && c+1 < 8 && (findPiece(cols[r-1]+rows[c+1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r-1]+rows[c+1]) == "none"))
	{
		var cell = cols[r-1]+rows[c+1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r-1 >= 0 && c-1 >= 0 && (findPiece(cols[r-1]+rows[c-1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r-1]+rows[c-1]) == "none"))
	{
		var cell = cols[r-1]+rows[c-1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r+1 < 8 && (findPiece(cols[r+1]+rows[c]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r+1]+rows[c]) == "none"))
	{
		var cell = cols[r+1]+rows[c];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(c+1 < 8 && (findPiece(cols[r]+rows[c+1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r]+rows[c+1]) == "none"))
	{
		var cell = cols[r]+rows[c+1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(r-1 >= 0 && (findPiece(cols[r-1]+rows[c]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r-1]+rows[c]) == "none"))
	{
		var cell = cols[r-1]+rows[c];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
	if(c-1 >= 0 && (findPiece(cols[r]+rows[c-1]).substring(0,1) == turnColr[1-turn] || findPiece(cols[r]+rows[c-1]) == "none"))
	{
		var cell = cols[r]+rows[c-1];
		allowedCells.push(cell);
		console.log(""+allowedCells);
		//document.getElementById(cell).style.backgroundColor = "yellow";
	}
}
function killIt(loc)
{
	var val = findPiece(loc);
	if(val != "none")
	{
		document.getElementById("black").innerHTML = "";
		document.getElementById("white").innerHTML = "";
		if(killedPiece.hasOwnProperty(val)) killedPiece[val] = loc;
		console.log("Killed pieces: ");
		for(var i in killedPiece) if(killedPiece[i] != '#') console.log(i+" -> "+killedPiece[i]);
		loadKilled();
		document.getElementById(val).style.display = "none";
		delete pieceLoc[val];
	}
}
function loadKilled()
{
	document.getElementById("black").innerHTML = "";
	document.getElementById("white").innerHTML = "";
	//console.log("Killed pieces: ");
	for(var i in killedPiece) 
	{
		if(killedPiece[i] != '#')
		{
			if(i.substring(0,1) == "b")
			{
				document.getElementById("black").innerHTML += "<img src="+pics[piecePic[i]]+" width=20px>";
			}
			else document.getElementById("white").innerHTML += "<img src="+pics[piecePic[i]]+" width=20px>"; 
			//console.log(i+" -> "+killedPiece[i]);
		}
	}
}
function isCheck(piece,targetColr)
{
	//console.log("Checking check: "+piece);
	var currCell = pieceLoc[piece];
	var r = cols.indexOf(currCell.substring(0,1));
	var c = rows.indexOf(currCell.substring(1,2));
	switch(piece.substring(1,2))
	{
		case "b":
			var t1 = checkPath(currCell,r,c,1,1,targetColr);
			if(t1) return true;
			var t2 = checkPath(currCell,r,c,-1,1,targetColr);
			if(t2) return true;
			var t3 = checkPath(currCell,r,c,1,-1,targetColr);
			if(t3) return true;
			var t4 = checkPath(currCell,r,c,-1,-1,targetColr);
			if(t4) return true;
			return false;
		case "r":
			var t1 = checkPath(currCell,r,c,1,0,targetColr);
			if(t1) return true;
			var t2 = checkPath(currCell,r,c,-1,0,targetColr);
			if(t2) return true;
			var t3 = checkPath(currCell,r,c,0,-1,targetColr);
			if(t3) return true;
			var t4 = checkPath(currCell,r,c,0,1,targetColr);
			if(t4) return true;
			return false;
		case "q":
			var t1 = checkPath(currCell,r,c,1,0,targetColr);
			if(t1) return true;
			var t2 = checkPath(currCell,r,c,-1,0,targetColr);
			if(t2) return true;
			var t3 = checkPath(currCell,r,c,0,1,targetColr);
			if(t3) return true;
			var t4 = checkPath(currCell,r,c,0,-1,targetColr);
			if(t4) return true;
			var t5 = checkPath(currCell,r,c,1,1,targetColr);
			if(t5) return true;
			var t6 = checkPath(currCell,r,c,-1,1,targetColr);
			if(t6) return true;
			var t7 = checkPath(currCell,r,c,1,-1,targetColr);
			if(t7) return true;
			var t8 = checkPath(currCell,r,c,-1,-1,targetColr);
			if(t8) return true;
			return false;
		case "n":
			return(horseCheck(currCell,r,c,targetColr));
		case "k":
			return(kingCheck(currCell,r,c,targetColr));
		case "p":
			var king = targetColr+'k';
			if(c == 1 && turn == 1)
			{
				var cell3 = cols[r+1]+"3";
				var cell4 = cols[r-1]+"3";
				if(r+1 < 8)
				{
					if(findPiece(cell3) == king) return true;
				}
				if(r-1 > -1) if(findPiece(cell4) == king) return true;
			}
			else if(c == 6 && turn == 0)
			{
				var cell3 = cols[r+1]+"6";
				var cell4 = cols[r-1]+"6";
				if(r+1 < 8)
				{
					if(findPiece(cell3) == king) return true;
				}
				if(r-1 > -1) if(findPiece(cell4) == king) return true;
			}
			else {
				var incrementor = 0;
				//console.log("$$$$"+targetColr);
				if(targetColr == "w") incrementor = 1;
				else incrementor = -1;
				var cell3 = cols[r+1]+rows[c+incrementor];
				var cell4 = cols[r-1]+rows[c+incrementor];
				if(r+1 < 8)
				{
					if(findPiece(cell3) == king)
					{
						//document.getElementById(cell3).style.backgroundColor = "blue";
						return true;
					}
				}
				if(r-1 > -1)
				{
					if(findPiece(cell4) == king)
					{
						//document.getElementById(cell4).style.backgroundColor = "blue";
						return true;
					}
				}
			}
			return false;
	}
}
function checkPath(currCell,r,c,inr,inc,targetColr)
{
	//document.getElementById(currCell).style.backgroundColor = "yellow";
	var l = [""+currCell];
	r+=inr;
	c+=inc;
	while(r<8 && r>-1 && c<8 && c>-1)
	{
		var cell = cols[r]+rows[c];
		var t = findPiece(cell);
		if(t != "none") 
		{
			//console.log("$#"+t);
			var top = t.substring(0,1);
			var targetKing = targetColr+"k";
			//console.log("**"+targetKing);
			if(t == targetKing) return true;
			return false;
		}
		l.push(cell);
		//document.getElementById(cell).style.backgroundColor = "yellow";
		r+=inr;
		c+=inc;
		//console.log("*"+l);
	}
	//console.log("#"+l);
	return false;
}
function selfCheck(targetColr)
{
	for(var piece in pieceLoc)
	{
		if(piece != "" && piece.substring(0,1) != targetColr)
		{
			//console.log("**Current piece: "+piece);
			var result = isCheck(piece,targetColr);
			if(result) 
			{
				console.log("Threat detected by "+piece);
				document.getElementById(pieceLoc[piece]).style.backgroundColor = "red";
				return true;
			}
		}
	}
	return false;
}
function horseCheck(currCell,r,c,targetColr)
{
	var k = targetColr+'k';
	if(r+2 < 8 && c+1 < 8 && findPiece(cols[r+2]+rows[c+1]) == k) return true;
	if(r+2 < 8 && c-1 >= 0 && findPiece(cols[r+2]+rows[c-1]) == k) return true;
	if(r-2 >= 0 && c+1 < 8 && findPiece(cols[r-2]+rows[c+1]) == k) return true;
	if(r-2 >= 0 && c-1 >= 0 && findPiece(cols[r-2]+rows[c-1]) == k) return true;
	if(r+1 < 8 && c+2 < 8 && findPiece(cols[r+1]+rows[c+2]) == k) return true;
	if(r+1 < 8 && c-2 >= 0 && findPiece(cols[r+1]+rows[c-2]) == k) return true;
	if(r-1 >= 0 && c+2 < 8 && findPiece(cols[r-1]+rows[c+2]) == k) return true;
	if(r-1 >= 0 && c-2 >= 0 && findPiece(cols[r-1]+rows[c-2]) == k) return true;
	return false;
}
function kingCheck(currCell,r,c,targetColr)
{
	var k = targetColr+'k';
	if(r+1 < 8 && c+1 < 8 && findPiece(cols[r+1]+rows[c+1]) == k) return true;
	if(r+1 < 8 && c-1 >= 0 && findPiece(cols[r+1]+rows[c-1]) == k) return true;
	if(r-1 >= 0 && c+1 < 8 && findPiece(cols[r-1]+rows[c+1]) == k) return true;
	if(r-1 >= 0 && c-1 >= 0 && findPiece(cols[r-1]+rows[c-1]) == k) return true;
	if(r+1 < 8 && findPiece(cols[r+1]+rows[c]) == k) return true;
	if(c+1 < 8 && findPiece(cols[r]+rows[c+1]) == k) return true;
	if(r-1 >= 0 && findPiece(cols[r-1]+rows[c]) == k) return true;
	if(c-1 >= 0 && findPiece(cols[r]+rows[c-1]) == k) return true;
	return false;
}
function isCheckmate(targetColr)
{
	for(var piece in pieceLoc)
	{
		if(piece.substring(0,1) == targetColr)
		{
			console.log("Current piece for checkmate : "+piece);
			var result = isPossible(piece,targetColr);
			if(result) 
			{
				console.log("Can be avoided by "+piece);
				//document.getElementById(pieceLoc[piece]).style.backgroundColor = "yellow";
				return false;
			}
		}
	}
	return true;		
}
function isPossible(piece,targetColr)
{
	console.log("Checking check: "+piece);
	var currCell = pieceLoc[piece];
	var r = cols.indexOf(currCell.substring(0,1));
	var c = rows.indexOf(currCell.substring(1,2));
	switch(piece.substring(1,2))
	{
		case "b":
			if(traversePathCheck(piece,currCell,r,c,1,1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,1,-1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,-1,1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,-1,-1,targetColr)) return true;
			return false;
		case "r":
			if(traversePathCheck(piece,currCell,r,c,1,0,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,-1,0,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,0,1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,0,-1,targetColr)) return true;
			return false;
		case "q":
			if(traversePathCheck(piece,currCell,r,c,1,1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,1,-1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,-1,1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,-1,-1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,1,0,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,-1,0,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,0,1,targetColr)) return true;
			if(traversePathCheck(piece,currCell,r,c,0,-1,targetColr)) return true;
			return false;
		case "p":
			if(c == 1 && turn == 0)
			{
				var cell1 = cols[r]+"3";
				var cell2 = cols[r]+"4";
				var cell3 = cols[r+1]+"3";
				var cell4 = cols[r-1]+"3";
				if(r+1 < 8)
				{
					if(findPiece(cell3).substring(0,1) == turnColr[turn])
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell3);
						pieceLoc[piece] = cell3;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell3;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell3).style.backgroundColor = "blue";
							console.log("Move to "+cell3);
							return true;
						}
						pieceLoc[oldPiece] = cell3;
						pieceLoc[piece] = oldPlace;
					}
				}
				if(r-1 > -1) 
				{
					if(findPiece(cell4).substring(0,1) == turnColr[turn])
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell4);
						pieceLoc[piece] = cell4;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell4;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell4).style.backgroundColor = "blue";
							console.log("Move to "+cell4);
							return true;
						}
						pieceLoc[oldPiece] = cell4;
						pieceLoc[piece] = oldPlace;
					}
				}
				if(findPiece(cell1) == "none") 
				{
					var oldPlace = pieceLoc[piece];
					var oldPiece = findPiece(cell1);
					pieceLoc[piece] = cell1;
					if(oldPiece != "none") pieceLoc[oldPiece] = '#';
					if(!selfCheck(turnColr[1-turn%2])) 
					{
						pieceLoc[oldPiece] = cell1;
						pieceLoc[piece] = oldPlace;
						//document.getElementById(cell1).style.backgroundColor = "blue";
						console.log("Move to "+cell1);
						return true;
					}
					pieceLoc[oldPiece] = cell1;
					pieceLoc[piece] = oldPlace;
					if(findPiece(cell2) == "none")
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell1);
						pieceLoc[piece] = cell1;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell2;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell2).style.backgroundColor = "blue";
							console.log("Move to "+cell2);
							return true;
						}
						pieceLoc[oldPiece] = cell2;
						pieceLoc[piece] = oldPlace;
					}
				}
			}
			else if(c == 6 && turn == 1)
			{
				var cell1 = cols[r]+"6";
				var cell2 = cols[r]+"5";
				var cell3 = cols[r+1]+"6";
				var cell4 = cols[r-1]+"6";
				if(r+1 < 8)
				{
					if(findPiece(cell3).substring(0,1) == turnColr[turn])
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell3);
						pieceLoc[piece] = cell3;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell3;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell3).style.backgroundColor = "blue";
							console.log("Move to "+cell3);
							return true;
						}
						pieceLoc[oldPiece] = cell3;
						pieceLoc[piece] = oldPlace;
					}
				}
				if(r-1 > -1) 
				{
					if(findPiece(cell4).substring(0,1) == turnColr[turn])
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell4);
						pieceLoc[piece] = cell4;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell4;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell4).style.backgroundColor = "blue";
							console.log("Move to "+cell4);
							return true;
						}
						pieceLoc[oldPiece] = cell4;
						pieceLoc[piece] = oldPlace;
					}
				}
				if(findPiece(cell1) == "none") 
				{
					var oldPlace = pieceLoc[piece];
					var oldPiece = findPiece(cell1);
					pieceLoc[piece] = cell1;
					if(oldPiece != "none") pieceLoc[oldPiece] = '#';
					if(!selfCheck(turnColr[1-turn%2])) 
					{
						pieceLoc[oldPiece] = cell1;
						pieceLoc[piece] = oldPlace;
						//document.getElementById(cell1).style.backgroundColor = "blue";
						console.log("Move to "+cell1);
						return true;
					}
					pieceLoc[oldPiece] = cell1;
					pieceLoc[piece] = oldPlace;
					if(findPiece(cell2) == "none")
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell2);
						pieceLoc[piece] = cell2;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell2;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell2).style.backgroundColor = "blue";
							console.log("Move to "+cell2);
							return true;
						}
						pieceLoc[oldPiece] = cell2;
						pieceLoc[piece] = oldPlace;
					}
				}
			}
			else {
				var cell1 = cols[r]+rows[c+pawnMove[1-turn]];
				var cell3 = cols[r+1]+rows[c+pawnMove[1-turn]];
				var cell4 = cols[r-1]+rows[c+pawnMove[1-turn]];
				if(r+1 < 8)
				{
					if(findPiece(cell3).substring(0,1) == turnColr[turn])
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell3);
						pieceLoc[piece] = cell3;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell3;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell3).style.backgroundColor = "blue";
							console.log("Move to "+cell3);
							return true;
						}
						pieceLoc[oldPiece] = cell3;
						pieceLoc[piece] = oldPlace;
					}
				}
				if(r-1 > -1) 
				{
					if(findPiece(cell4).substring(0,1) == turnColr[turn])
					{
						var oldPlace = pieceLoc[piece];
						var oldPiece = findPiece(cell4);
						pieceLoc[piece] = cell4;
						if(oldPiece != "none") pieceLoc[oldPiece] = '#';
						if(!selfCheck(turnColr[1-turn%2])) 
						{
							pieceLoc[oldPiece] = cell4;
							pieceLoc[piece] = oldPlace;
							//document.getElementById(cell4).style.backgroundColor = "blue";
							console.log("Move to "+cell4);
							return true;
						}
						pieceLoc[oldPiece] = cell4;
						pieceLoc[piece] = oldPlace;
					}
				}
				if(findPiece(cell1) == "none") 
				{
					var oldPlace = pieceLoc[piece];
					var oldPiece = findPiece(cell1);
					pieceLoc[piece] = cell1;
					if(oldPiece != "none") pieceLoc[oldPiece] = '#';
					if(!selfCheck(turnColr[1-turn%2])) 
					{
						pieceLoc[oldPiece] = cell1;
						pieceLoc[piece] = oldPlace;
						//document.getElementById(cell1).style.backgroundColor = "blue";
						console.log("Move to "+cell1);
						return true;
					}
					pieceLoc[oldPiece] = cell1;
					pieceLoc[piece] = oldPlace;
				}
			}
			return false;
		case "k": 
			if(r+1 < 8 && c+1 < 8 && (findPiece(cols[r+1]+rows[c+1]).substring(0,1) == turnColr[turn] || findPiece(cols[r+1]+rows[c+1]) == "none")) 
			{
				var cell = cols[r+1]+rows[c+1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r+1]+rows[c+1]+" unsafe"); 
			}
			if(r+1 < 8 && c-1 >= 0 && (findPiece(cols[r+1]+rows[c-1]).substring(0,1) == turnColr[turn] || findPiece(cols[r+1]+rows[c-1]) == "none")) 
			{
				var cell = cols[r+1]+rows[c-1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r+1]+rows[c-1]+" unsafe");
			}
			if(r-1 >= 0 && c+1 < 8 && (findPiece(cols[r-1]+rows[c+1]).substring(0,1) == turnColr[turn] || findPiece(cols[r-1]+rows[c+1]) == "none")) 
			{
				var cell = cols[r-1]+rows[c+1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r-1]+rows[c+1]+" unsafe");
			}
			if(r-1 >= 0 && c-1 >= 0 && (findPiece(cols[r-1]+rows[c-1]).substring(0,1) == turnColr[turn] || findPiece(cols[r-1]+rows[c-1]) == "none")) 
			{
				var cell = cols[r-1]+rows[c-1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r-1]+rows[c-1]+" unsafe");
			}
			if(r+1 < 8 && (findPiece(cols[r+1]+rows[c]).substring(0,1) == turnColr[turn] || findPiece(cols[r+1]+rows[c]) == "none")) 
			{
				var cell = cols[r+1]+rows[c];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r+1]+rows[c]+" unsafe");
			}
			if(c+1 < 8 && (findPiece(cols[r]+rows[c+1]).substring(0,1) == turnColr[turn] || findPiece(cols[r]+rows[c+1]) == "none")) 
			{
				var cell = cols[r]+rows[c+1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r]+rows[c+1]+" unsafe");
			}
			if(r-1 >= 0 && (findPiece(cols[r-1]+rows[c]).substring(0,1) == turnColr[turn] || findPiece(cols[r-1]+rows[c]) == "none")) 
			{
				var cell = cols[r-1]+rows[c];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r-1]+rows[c]+" unsafe");
			}
			if(c-1 >= 0 && (findPiece(cols[r]+rows[c-1]).substring(0,1) == turnColr[turn] || findPiece(cols[r]+rows[c-1]) == "none")) 
			{
				var cell = cols[r]+rows[c-1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r]+rows[c-1]+" unsafe");
			}
			return false;
		case "n":
			if(r+2 < 8 && c+1 < 8 && (findPiece(cols[r+2]+rows[c+1]).substring(0,1) == turnColr[turn] || findPiece(cols[r+2]+rows[c+1]) == "none")) 
			{
				var cell = cols[r+2]+rows[c+1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r+2]+rows[c+1]+" unsafe"); 
			}
			if(r+2 < 8 && c-1 >= 0 && (findPiece(cols[r+2]+rows[c-1]).substring(0,1) == turnColr[turn] || findPiece(cols[r+2]+rows[c-1]) == "none")) 
			{
				var cell = cols[r+2]+rows[c-1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r+2]+rows[c-1]+" unsafe");
			}
			if(r-2 >= 0 && c+1 < 8 && (findPiece(cols[r-2]+rows[c+1]).substring(0,1) == turnColr[turn] || findPiece(cols[r-2]+rows[c+1]) == "none")) 
			{
				var cell = cols[r-2]+rows[c+1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r-2]+rows[c+1]+" unsafe");
			}
			if(r-2 >= 0 && c-1 >= 0 && (findPiece(cols[r-2]+rows[c-1]).substring(0,1) == turnColr[turn] || findPiece(cols[r-2]+rows[c-1]) == "none")) 
			{
				var cell = cols[r-2]+rows[c-1];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r-1]+rows[c-1]+" unsafe");
			}
			if(r+1 < 8 && c+2 < 8 && (findPiece(cols[r+1]+rows[c+2]).substring(0,1) == turnColr[turn] || findPiece(cols[r+1]+rows[c+2]) == "none")) 
			{
				var cell = cols[r+1]+rows[c+2];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r+1]+rows[c+2]+" unsafe");
			}
			if(r+1 < 8 && c-2 < 8 && (findPiece(cols[r+1]+rows[c-2]).substring(0,1) == turnColr[turn] || findPiece(cols[r+1]+rows[c-2]) == "none")) 
			{
				var cell = cols[r+1]+rows[c-2];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r+1]+rows[c-2]+" unsafe");
			}
			if(r-1 >= 0 && c+2 < 8 && (findPiece(cols[r-1]+rows[c+2]).substring(0,1) == turnColr[turn] || findPiece(cols[r-1]+rows[c+2]) == "none")) 
			{
				var cell = cols[r-1]+rows[c+2];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r-1]+rows[c+2]+" unsafe");
			}
			if(r-1 >=0 && c-2 >= 0 && (findPiece(cols[r-1]+rows[c-2]).substring(0,1) == turnColr[turn] || findPiece(cols[r-1]+rows[c-2]) == "none")) 
			{
				var cell = cols[r-1]+rows[c-2];
				var oldPlace = pieceLoc[piece];
				var oldPiece = findPiece(cell);
				pieceLoc[piece] = cell;
				if(oldPiece != "none") pieceLoc[oldPiece] = '#';
				if(!selfCheck(turnColr[1-turn%2])) 
				{
					pieceLoc[oldPiece] = cell;
					pieceLoc[piece] = oldPlace;
					//document.getElementById(cell).style.backgroundColor = "blue";
					console.log("Move to "+cell);
					return true;
				}
				pieceLoc[oldPiece] = cell;
				pieceLoc[piece] = oldPlace;
				console.log("Moving to "+cols[r-1]+rows[c-2]+" unsafe");
			}
			return false;
	}
	function traversePathCheck(element,currCell,r,c,inc,inr,targetColr)
	{
		var l = [""+currCell];
		r+=inr;
		c+=inc;
		while(r<8 && r>-1 && c<8 && c>-1)
		{
			var cell = cols[r]+rows[c];
			if(findPiece(cell).substring(0,1) == targetColr) break;
			var oldPlace = pieceLoc[element];
			var oldPiece = findPiece(cell);
			pieceLoc[element] = cell;
			if(oldPiece != "none") pieceLoc[oldPiece] = '#';
			if(!selfCheck(turnColr[1-turn%2])) 
			{
				pieceLoc[oldPiece] = cell;
				pieceLoc[element] = oldPlace;
				console.log("Move to "+cell);
				return true;
			}
			pieceLoc[oldPiece] = cell;
			pieceLoc[element] = oldPlace;
			r+=inr;
			c+=inc;
			//console.log("*"+l);
		}
		//console.log("#"+l);
		return false;
	};
}
function castling(targetColr)
{
	var currentPos = pieceLoc[""+targetColr+"k"];
	var kingPos = originalPos(targetColr);
	var col = colr.indexOf(currentPos.substring(0,1));
	var row = rows.indexOf(currentPos.substring(1,2));
	console.log("Current="+currentPos+" expected="+kingPos);
	if(kingPos == currentPos && pieceLoc[""+targetColr+"r2"] == "h"+rows[row])
	{
		console.log("Inside");
		if(findPiece("f"+rows[row]) == "none")
		{
			if(findPiece("g"+rows[row]) == "none") 
			{
				console.log("g"+rows[row]);
				allowedCells.push("g"+rows[row]);
				castledCells.push("g"+rows[row]);
				//document.getElementById("g"+rows[row]).style.backgroundColor = "blue";
				isCastle = true;
			}
		}
	}
}
function originalPos(king)
{
	if(king == "w") return "e8";
	return "e1";
}