function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
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

function loadpage(url){
	window.location.assign(url);
}


