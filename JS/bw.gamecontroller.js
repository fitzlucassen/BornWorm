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
    this.distance += Math.round(distance,2);
    this.currentScore += Math.round(this.maxScore * this.echelle / this.distance);
}
GameController.prototype.getScore = function(){
    return this.currentScore;
}