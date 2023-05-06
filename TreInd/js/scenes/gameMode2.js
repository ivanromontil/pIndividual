var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard", level:5}';
options_data = JSON.parse(json);
var timeShown = 5000

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
		this.level;
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
		this.level= options_data.level
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
		console.log(this.level)
		if(!this.started){

			timeWaiting=timeShown/this.level;

			this.started=true;
		}
		console.log(timeWaiting)
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
							setTimeout(()=>{
								card.enableBody(false, 0, 0, true, true);
							},timeWaiting/5)
							this.score-=(this.level*5)
							this.firstClick.enableBody(false, 0, 0, true, true);
							if (this.score <= 0){
								alert("Game Over");
								loadpage("../");
							}
						}
						else{
							this.correct++;
							if (this.correct >= this.num_cards){
                                
                                var options_data = {
                                    cards:this.num_cards, 
									dificulty:this.dificulty, 
									level:this.level
                                };

                                if(options_data.cards == 2){
                                    options_data.cards=3;
                                }
                                else if(options_data.cards == 3){
                                    options_data.cards=4;
                                }
								else{
									options_data.level++
								}
                                var save = function(){
									localStorage.setItem("config", JSON.stringify(options_data));
                                };
                                save();
								
								this.firstClick = null;
								
								loadpage("./gameMode2.html");
								
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

