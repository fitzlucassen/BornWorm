function GameController() {
    this.currentScore = 0;
    this.distance = 0;
    this.echelle = 5;
    this.maxScore = 1000;
}
GameController.prototype.setEchelle = function(echelle){
    if(echelle == 5 || echelle == 10 || echelle == 15)
	this.echelle = echelle;
}
GameController.prototype.calculatScore = function(distance){
    this.distance += Math.round(distance);
    this.currentScore += Math.round(this.maxScore * this.echelle / this.distance);
}
GameController.prototype.getScore = function(){
    return this.currentScore;
}
GameController.prototype.saveScore = function(score){
    var json = {
	id: Facebook.me.id,
	name: Facebook.me.name,
	score: score,
	toSave: true
    };
    $.ajax({
	type: "POST",
	url: 'Script/bw.utilities.php',
	data: json,
	success: function(data){},
	dataType: json
    });
}
GameController.prototype.getClassement = function(){
    var json = {
	id: Facebook.me.id,
	name: Facebook.me.name,
	score: 0,
	toSave: false
    };
    $.ajax({
	type: "POST",
	url: 'Script/bw.utilities.php',
	data: json,
	success: function(data){
	    console.log(data);
	},
	dataType: json
    });
}