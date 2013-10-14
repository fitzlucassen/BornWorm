var Maps = {};
var Facebook = {};
var View = {};
var Game = {};
var cptFriends = 0;
var logged = false;

$(document).ready(function () {
    // Initialisation des controllers
    Maps = new MapsController();
    Facebook = new FacebookController();
    Game = new GameController();
    View = new MainView();
    
    $('.button-facebook > span').click(function(){
	// Facebook connect + demande utilisateur
	if(!logged){
	    Facebook.connect();
	    View.refreshAfterConnect();
	}
    });
    
    // Validation du nombre d'ami -->
    $('#layout').on('click', '.nbFriends', function(){
	// On cache la div
	View.startGame();
	
	Game.setEchelle($(this).val());
	// On récupère le nombre d'ami choisi en random
        Facebook.takeXFriends(Facebook.response, $(this).val());
	
	View.appendNewName(Facebook.response[cptFriends].name);
	
	// On initialise la maps avec le premier ami de la liste
	initializeMaps(Facebook.response[cptFriends]);
	cptFriends++;
    });
    
    $('#layout').on('click', '#nextFriend', function(){
	// On cache les div
	View.nextFriend();
	
	if(Facebook.response.length == cptFriends){
            $('#result').fadeOut('slow');
            $('#friend').fadeOut('slow');
            $('#gameOver').fadeIn('slow');
	    View.appendShare(Game.getScore());
        }
        else{
            View.appendNewName(Facebook.response[cptFriends].name);
        }
	// On initialise la maps avec le premier ami de la liste
	initializeMaps(Facebook.response[cptFriends]);
	cptFriends++;
    });
});
	
function initializeMaps(friend) {
    Maps.getGeolocalisation();
	
    // Récupérer la position peut prendre un peu de temps. D'où un délai de 1s avant la suite
    setTimeout(function () {
	Maps.initialyze(friend);
    }, 1000);
}

function rad(x) {
    return x * Math.PI / 180;
}