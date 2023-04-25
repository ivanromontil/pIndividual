var load_obj = function(){
	var vue_instance = new Vue({
		el: "#scores_id",
		data: {
			saves: []
		},
		created: function(){
			let arrayPartides = [];
			if(localStorage.puntuacions){
				arrayPartides = JSON.parse(localStorage.puntuacions);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			this.saves = arrayPartides;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida = i;
				loadpage("../html/game.html");
			}
		}
	});
	return {}; 
}();

