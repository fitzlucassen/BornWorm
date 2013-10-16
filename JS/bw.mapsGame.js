var Maps = {};
var Facebook = {};
var View = {};
var Game = {};
var ErrorGame = {};

var clientHeight = $(window).height() - 211;
var cptFriends = 0;
var logged = false;

$(document).ready(function () {
    // Initialisation des controllers
    Maps = new MapsController();
    Facebook = new FacebookController();
    Game = new GameController();
    View = new MainView();
    ErrorGame = new ErrorView();
    
    // Get geolocalisation
    Maps.getGeolocalisation();
    initializeMaps();
    
    setTimeout(function() {
	FB.getLoginStatus(function(response){
	    if (response.status === 'connected') {
		Facebook.connect();
		start();
	    }
	});
    },2000);

    $('.button-facebook > span').click(function(){
	// Facebook connect + demande utilisateur
	if(!logged){
	    Facebook.connect();
	    start();
	}
    });
    
    // Validation du nombre d'ami
    $('#layout').on('click', '.nbFriends', function(){
	// On cache la div
	View.startGame();
	// On set l'echelle des scores
	Game.setEchelle($(this).val());
	// On récupère le nombre d'ami choisi en random
	Facebook.takeXFriends(Facebook.response, $(this).val());
	// On affiche les infos de l'ami à trouver'
	View.appendNewName(Facebook.response[cptFriends].name, 'https://graph.facebook.com/' + Facebook.response[cptFriends].id + '/picture');

	// On initialise la maps avec le premier ami de la liste
	Maps.cleanMarkers(Facebook.response[cptFriends]);
	cptFriends++;
    });
    
    $('#result').on('click', '#nextFriend', function(){
	// On cache les div de l'ancien ami
	View.nextFriend();
	
	// Si on a fini
	if(Facebook.response.length == cptFriends){
	    // On cache les div de jeu
            $('#result').fadeOut('slow');
            $('#friend').fadeOut('slow');
	    // On affiche les div de fin
            $('#gameOver').fadeIn('slow');
	    View.appendShare(Game.getScore());
	    // On récupère tous les amis pour l'invitation
	    View.appendRequest();
	    // On sauvegarde
	    Game.saveScore(Game.getScore());
	    // Et on affiche le classement
	    Game.getClassement();
        }
        else{
	    // Sinon on passe au suivant
            View.appendNewName(Facebook.response[cptFriends].name, 'https://graph.facebook.com/' + Facebook.response[cptFriends].id + '/picture');
        }
	// On initialise la maps avec le premier ami de la liste
	Maps.cleanMarkers(Facebook.response[cptFriends]);
	cptFriends++;
    });
    
    $('#close-error').click(function(){
	$('#error-view').fadeOut('slow');
    });
});

function start(){
    ErrorGame.appendIfNoGeoloc();

    ErrorGame.appendIfNoData();
    ErrorGame.disableIfNoFriendsEnough();

    // On limite l'accès au jeu si pas de like
    Facebook.limitGameIfNoLike();
    View.refreshAfterConnect();
}
function initializeMaps(friend) {	
    // Récupérer la position peut prendre un peu de temps. D'où un délai de 1s avant la suite
    setTimeout(function () {
	Maps.initialyze(friend);
    }, 1000);
}
function rad(x) {
    return x * Math.PI / 180;
}