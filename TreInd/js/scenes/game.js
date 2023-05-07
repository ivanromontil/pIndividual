var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
options_data = JSON.parse(json);

class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.username=sessionStorage.getItem("username")
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.dificulty;
		this.started=false;
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){
		this.dificulty=options_data.dificulty;
		this.num_cards=options_data.cards;
		console.log(this.dificulty);
		this.items = ['cb', 'co', 'sb', 'so', 'tb', 'to'];

		this.items.sort(function(){return Math.random() - 0.5});
		this.items = this.items.slice(0, this.num_cards);
		this.items = this.items.concat(this.items);
		this.items.sort(function(){return Math.random() - 0.5});

		this.cameras.main.setBackgroundColor(0xBFFCFF);
		for (let j = 0; j < this.items.length; j++){
			this.add.image((50 + (100*j)), 300, this.items[j]);
		}
		this.cards = this.physics.add.staticGroup();

		var timeWaiting = 0;
		
		if(!this.started){
			if(options_data.dificulty === "hard"){
				timeWaiting = 1000;
			}
			else if(options_data.dificulty === "normal"){
				timeWaiting=4000;
			}
			else{
				timeWaiting=10000;
			}

			this.started=true;
		}

		setTimeout(()=>{
			for (let k = 0; k < this.items.length; k++){
				this.cards.create((50 + (100*k)), 300, 'back');
			}
			var arraycards = this.items;

			let i = 0;
			this.cards.children.iterate((card)=>{
				card.card_id = arraycards[i];
				i++;
				card.setInteractive();
				card.on('pointerup', () => {
					card.disableBody(true,true);
					if (this.firstClick){
						if (this.firstClick.card_id !== card.card_id){
							if(options_data.dificulty === "hard"){
								this.score-=40
								setTimeout(()=>{
									card.enableBody(false, 0, 0, true, true);
								},200)
							}
							else if(options_data.dificulty === "normal"){
								this.score-=20
								setTimeout(()=>{
									card.enableBody(false, 0, 0, true, true);
								},500)
							}
							else{
								this.score-=5
								setTimeout(()=>{
									card.enableBody(false, 0, 0, true, true);
								},1000)
							}
							this.firstClick.enableBody(false, 0, 0, true, true);
							if (this.score <= 0){
								alert("Game Over");
								loadpage("../");
							}
						}
						else{
							this.correct++;
							if (this.correct >= this.num_cards){
								
								alert("You Win with " + this.score + " points.");
								let partida = {
									username: this.username,
									score:this.score
								}
								let arrayPartides = [];
								if(localStorage.puntuacions){
									arrayPartides = JSON.parse(localStorage.puntuacions);
									if(!Array.isArray(arrayPartides)) arrayPartides = [];
								}
								arrayPartides.push(partida);
								arrayPartides.sort((a,b) => b.score - b.score);
								arrayPartides = arrayPartides.slice(0,10);
								localStorage.puntuacions = JSON.stringify(arrayPartides);
								loadpage("../");
							}
						}
						this.firstClick = null;
					}
					else{
						this.firstClick = card;
					}
				}, card);
			});
		},timeWaiting)
	}
	
	update (){	}
}

