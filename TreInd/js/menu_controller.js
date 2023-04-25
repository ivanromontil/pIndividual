function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html")
}

function options(){
	loadpage("./html/options.html");
}

function goToP2(){
	loadpage("./pi_2/index.html");
}
function goToP3(){
	loadpage("./pi_3/index.html");
}

function goToTreInd(){
	loadpage("./TreInd/menu.html");
}

function goToPhaserGame(){
	loadpage("./index.html")
}

function startGameMode2(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./gameMode2.html");
}

function goToMode1(){
	loadpage("./html/mode1.html");
}

function goToMode2(){
	loadpage("./html/mode2.html");
}
function goToRanking(){
	loadpage("./html/ranking.html");
	console.log(arrayPartides)
}

function loadpage(url){
	window.location.assign(url);
}

