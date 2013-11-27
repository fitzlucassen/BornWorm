function GameController() {
    this.currentScore = 0;
    this.distance = 0;
    this.echelle = 5;
    this.maxScore = 1000;
}
GameController.prototype.setEchelle = function(echelle){
    if(echelle == 5)
	this.echelle = 15;
    else if(echelle == 15)
	this.echelle = 5;
    else
	this.echelle = echelle;
}
GameController.prototype.calculatScore = function(distance){
    this.distance += Math.round(distance);
    
    if(distance < 1)
	this.currentScore += Math.round(this.maxScore * this.echelle);
    else
	this.currentScore += Math.round(this.maxScore * this.echelle / distance);
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
    var $this = this;
    
    $.ajax({
	type: "POST",
	url: 'Script/bw.utilities.php',
	data: json,
	success: function(data){
	    // Et on affiche le classement
	    $this.getClassement();
	},
	error: function(jqXHR, textStatus) {
	    alert( "Request failed: " + textStatus );
	}
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
	    View.appendClassement(data);
	},
	error: function(jqXHR, textStatus) {
	    alert( "Request failed: " + textStatus );
	}
    });
}