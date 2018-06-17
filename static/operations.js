function getElePrefix(ele)
{
	return ele.toUpperCase()[1];
}
function queryExecutor(qStr)
{
	var piece =  qStr.substring(0,1);
	var qColr = turnColr[turn];
	var len = qStr.length;
	var targetCell = qStr.substring(len-2, len);
	console.log("Target: "+targetCell);
	switch(piece)
	{
		case "N":
			var cPiece = qColr + "n";
			for(piece in pieceLoc)
			{
				if(piece.substring(0,2) == cPiece)
				{
					var curCell = pieceLoc[piece];
					console.log("Checking "+piece+" base loc "+curCell);
					var r = cols.indexOf(curCell.substring(0,1));
					var c = rows.indexOf(curCell.substring(1,2));
					horsePath(curCell, r, c);
					if(allowedCells.indexOf(targetCell) > -1)
					{
						console.log("Moving "+piece+" from "+curCell+" to "+targetCell);
						if(qStr.substring(1,2) == "x") killIt(targetCell);
						movePiece(piece, targetCell);
						pieceLoc[piece] = targetCell;
						turn = 1 - turn;
						break;
					}
				}
			}
			allowedCells = [];
			break;
		case "R":
			var cPiece = qColr + "r";
			for(piece in pieceLoc)
			{
				if(piece.substring(0,2) == cPiece)
				{
					var curCell = pieceLoc[piece];
					console.log("Checking "+piece+" base loc "+curCell);
					var r = cols.indexOf(curCell.substring(0,1));
					var c = rows.indexOf(curCell.substring(1,2));
					traversePath(curCell,r,c,1,0);
					traversePath(curCell,r,c,-1,0);
					traversePath(curCell,r,c,0,1);
					traversePath(curCell,r,c,0,-1);
					if(allowedCells.indexOf(targetCell) > -1)
					{
						console.log("Moving "+piece+" from "+curCell+" to "+targetCell);
						if(qStr.substring(1,2) == "x") killIt(targetCell);
						movePiece(piece, targetCell);
						pieceLoc[piece] = targetCell;
						turn = 1 - turn;
						break;
					}
				}
			}
			allowedCells = [];
			break;
		case "B":
			var cPiece = qColr + "b";
			for(piece in pieceLoc)
			{
				if(piece.substring(0,2) == cPiece)
				{
					var curCell = pieceLoc[piece];
					console.log("Checking "+piece+" base loc "+curCell);
					var r = cols.indexOf(curCell.substring(0,1));
					var c = rows.indexOf(curCell.substring(1,2));
					crossPath(curCell);
					if(allowedCells.indexOf(targetCell) > -1)
					{
						console.log("Moving "+piece+" from "+curCell+" to "+targetCell);
						if(qStr.substring(1,2) == "x") killIt(targetCell);
						movePiece(piece, targetCell);
						pieceLoc[piece] = targetCell;
						turn = 1 - turn;
						break;
					}
				}
			}
			allowedCells = [];
			break;
		case "Q":
			var cPiece = qColr + "q";
			for(piece in pieceLoc)
			{
				if(piece.substring(0,2) == cPiece)
				{
					var curCell = pieceLoc[piece];
					console.log("Checking "+piece+" base loc "+curCell);
					var r = cols.indexOf(curCell.substring(0,1));
					var c = rows.indexOf(curCell.substring(1,2));
					traversePath(curCell,r,c,1,0);
					traversePath(curCell,r,c,-1,0);
					traversePath(curCell,r,c,0,1);
					traversePath(curCell,r,c,0,-1);
					crossPath(curCell);
					if(allowedCells.indexOf(targetCell) > -1)
					{
						console.log("Moving "+piece+" from "+curCell+" to "+targetCell);
						if(qStr.substring(1,2) == "x") killIt(targetCell);
						movePiece(piece, targetCell);
						pieceLoc[piece] = targetCell;
						turn = 1 - turn;
						break;
					}
				}
			}
			allowedCells = [];
			break;
		case "K":
			var cPiece = qColr + "k";
			for(piece in pieceLoc)
			{
				if(piece.substring(0,2) == cPiece)
				{
					var curCell = pieceLoc[piece];
					console.log("Checking "+piece+" base loc "+curCell);
					var r = cols.indexOf(curCell.substring(0,1));
					var c = rows.indexOf(curCell.substring(1,2));
					kingPath(curCell,r,c);
					if(allowedCells.indexOf(targetCell) > -1)
					{
						console.log("Moving "+piece+" from "+curCell+" to "+targetCell);
						if(qStr.substring(1,2) == "x") killIt(targetCell);
						movePiece(piece, targetCell);
						pieceLoc[piece] = targetCell;
						turn = 1 - turn;
						break;
					}
				}
			}
			allowedCells = [];
			break;
		case "P":
			var cPiece = qColr + "p";
			for(piece in pieceLoc)
			{
				if(qStr.substring(1,2) == "x")
				{
						var curCell = pieceLoc[piece];
						console.log("Checking "+piece+" base loc "+curCell);
						var r = cols.indexOf(curCell.substring(0,1));
						var c = rows.indexOf(curCell.substring(1,2));
						if(piece.substring(0,2) == cPiece)
						{
							var dir=0;
							if(turn==0) {
								dir=-1;
							}
							else {
								dir=1;
							}
							console.log("*"+cols[r+1]+rows[(c+dir)%8]+" -"+cols[r+1]+rows[(c+dir)%8]);
							if(r<7 && cols[r+1]+rows[(c+dir)%8]==targetCell)
							{
								killIt(targetCell);
								movePiece(piece, targetCell);
								pieceLoc[piece] = targetCell;
								turn = 1 - turn;
								break;
							}
							else if(r>0 && cols[r-1]+rows[(c+dir)%8]==targetCell)
							{
								killIt(targetCell);
								movePiece(piece, targetCell);
								pieceLoc[piece] = targetCell;
								turn = 1 - turn;
								break;
							}
						}
						continue;
				}
				if(piece.substring(0,2) == cPiece)
				{
					var curCell = pieceLoc[piece];
					console.log("Checking "+piece+" base loc "+curCell);
					var r = cols.indexOf(curCell.substring(0,1));
					var c = rows.indexOf(curCell.substring(1,2));
					if(cols[r] != targetCell.substring(0, 1)) continue;
					var dir=0, boun=0;
					if(turn==0) {
						dir=-1;
						boun=7;
					}
					else {
						dir=1;
						boun=2;
					}

					var i=0, u=1;
					if(rows[c] == ""+boun) u=2;
					while(i<u)
					{
						c+=dir;
						var cell = cols[r]+rows[c];
						allowedCells.push(cell);
						i++;
					}
					console.log(allowedCells);
					if(allowedCells.indexOf(targetCell) > -1)
					{
						console.log("Moving "+piece+" from "+curCell+" to "+targetCell);
						movePiece(piece, targetCell);
						pieceLoc[piece] = targetCell;
						turn = 1 - turn;
						break;
					}
					allowedCells = [];
				}
			}
			allowedCells = [];
			break;
	}
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
