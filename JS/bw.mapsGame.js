var Maps = {};

$(document).ready(function () {
    Maps = new MapsController();
    initializeMaps();
});
	
function initializeMaps() {
    Maps.getGeolocalisation();
	
    // Récupérer la position peut prendre un peu de temps. D'où un délai de 1s avant la suite
    setTimeout(function () {
	Maps.initialyze();
    }, 1000);
}