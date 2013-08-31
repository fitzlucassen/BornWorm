function MapsController(){
    this.coordonnees = {
	lat: 48.856614,
	lng: 2.3522219000000177,
	alt: 0,
	zoom: 12
    };
    this.mapOptions = {
	center: new google.maps.LatLng(this.coordonnees.lat, this.coordonnees.lng),
	zoom: this.coordonnees.zoom,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.markerImageBorn = new google.maps.MarkerImage('Images/maps-marker-bleu.png');
    this.markerImageNow = new google.maps.MarkerImage('Images/maps-marker-rose.png');
    this.map = {};
    this.nbEssai = 1;
}

MapsController.prototype.initialyze = function () {
    if ($('#position').attr('data-lat') != "") {
	this.coordonnees.lat = $('#position').attr('data-lat');
	this.coordonnees.lng = $('#position').attr('data-lng');
	this.coordonnees.alt = $('#position').attr('data-alt');
	this.coordonnees.zoom = 14;
    }
    // On créée la map
    this.map = new google.maps.Map(document.getElementById("map-canvas"), this.mapOptions);
    $this = this;
    // On ajoute le listener pour la pose de marqueur au click
    google.maps.event.addListener(this.map, 'click', function (event) {
	$this.putMarker(event);
    });
}

MapsController.prototype.getGeolocalisation = function(){
    // Si le navigateur possède la géoloc on récupère sa position. Sinon on prends Paris par défaut
    if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	    // ON inscrit la position dans le DOM
	    $('#position').attr('data-lat', position.coords.latitude);
	    $('#position').attr('data-lng', position.coords.longitude);
	    $('#position').attr('data-alt', position.coords.altitude);
	});
    }
    return this.coordonnees;
}

MapsController.prototype.putMarker = function (event) {
    var title = "Essai numéro " + this.nbEssai;
    this.nbEssai++;;
    
    // Création du Marker
    var myMarker = new google.maps.Marker({
	// Coordonnées
	position: event.latLng,
	map: this.map,
	title: title,
	icon: this.markerImageNow
    });
    this.map.panTo(event.latLng);
}