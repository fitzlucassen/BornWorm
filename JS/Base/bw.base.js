var Maps = {};

$(document).ready(function () {
	Maps = new MapsController();
	initializeMaps();
});
	
function initializeMaps() {
	Maps.getGeolocalisation();
	
	// R�cup�rer la position peut prendre un peu de temps. D'o� un d�lai de 1s avant la suite
	setTimeout(function () {
		Maps.initialyze();
	}, 1000);
}