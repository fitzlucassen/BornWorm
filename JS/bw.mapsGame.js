var Maps = {};
var Facebook = {};

$(document).ready(function () {
    Maps = new MapsController();
    Facebook = new FacebookController();
    
    setTimeout(function(){
	Facebook.connect();
	$('#explanation').fadeIn('slow');
    },1000);
    
    $('#layout').on('click', '.nbFriends', function(){
	initializeMaps();
    });
});
	
function initializeMaps(friends) {
    Maps.getGeolocalisation();
	
    // Récupérer la position peut prendre un peu de temps. D'où un délai de 1s avant la suite
    setTimeout(function () {
	Maps.initialyze(friends);
    }, 1000);
}