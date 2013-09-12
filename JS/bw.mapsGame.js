var Maps = {};
var Facebook = {};
var cptFriends = 0;

$(document).ready(function () {
    // Initialisation des controllers
    Maps = new MapsController();
    Facebook = new FacebookController();
    
    // Facebook connect + demande utilisateur
    setTimeout(function(){
	Facebook.connect();
	$('#explanation').fadeIn('slow');
    },1000);
    
    // Validation du nombre d'ami -->
    $('#layout').on('click', '.nbFriends', function(){
	// On cache la div
	$('#explanation').fadeOut('slow');
	
	// On récupère le nombre d'ami choisi en random
        Facebook.takeXFriends(Facebook.response, $(this).val());
	
	$('#friendName').html(Facebook.response[cptFriends].name);
	$('#friend').fadeIn('slow');
	// On initialise la maps avec le premier ami de la liste
	initializeMaps(Facebook.response[cptFriends]);
	cptFriends++;
    });
    
    $('#layout').on('click', '#nextFriend', function(){
	// On cache la div
	$('#result').fadeOut('slow');
	$('#friend').fadeOut('slow');
	
	$('#friendName').html(Facebook.response[cptFriends].name);
	$('#friend').fadeIn('slow');
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
var rad = function(x) {return x*Math.PI/180;}