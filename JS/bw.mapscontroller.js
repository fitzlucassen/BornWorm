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
	this.markerImage = new google.maps.MarkerImage('Images/maps-marker.png');
	this.map = {};
}

MapsController.prototype.initialyze = function () {
	if ($('#position').attr('data-lat') != "") {
		this.coordonnees.lat = $('#position').attr('data-lat');
		this.coordonnees.lng = $('#position').attr('data-lng');
		this.coordonnees.alt = $('#position').attr('data-alt');
		this.coordonnees.zoom = 14;
	}
	// On cr��e la map
	this.map = new google.maps.Map(document.getElementById("map-canvas"), this.mapOptions);
	$this = this;
	// On ajoute le listener pour la pose de marqueur au click
	google.maps.event.addListener(this.map, 'click', function (event) {
		$this.putMarker(event);
	});
}

MapsController.prototype.getGeolocalisation = function(){
	// Si le navigateur poss�de la g�oloc on r�cup�re sa position. Sinon on prends Paris par d�faut
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
	var title = "";

	// Cr�ation du Marker
	var myMarker = new google.maps.Marker({
		// Coordonn�es
		position: event.latLng,
		map: this.map,
		title: title
	});
	this.map.panTo(event.latLng);
}