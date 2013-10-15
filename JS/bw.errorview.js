function ErrorView() {
    this.divError = $('#error-view');
}

ErrorView.prototype.appendIfNoGeoloc = function(){
    if ($('#position').attr('data-lat') == "") {
	this.divError.append('<p>- Il est impossible de récupérer votre position géographique, veuillez accepter la géolocalisation. Paris sera prit par défaut.</p>');
	this.divError.fadeIn('slow');
    }
}
ErrorView.prototype.appendIfNoData = function(){
    if(Facebook.response.length == 0){
	this.divError.append('<p>- Aucun ami n\'a été récupéré, vérifiez les points suivant :</p>');
	var html = '';
	html += '<ul>';
	html += '<li>Vous avec liké la page BornWorm</li>';
	html += '<li>Vous avez accepté les pop-up sur votre navigateur</li>';
	html += '<li>Vous avez autorisé l\'application à accéder à vos informations</li>';
	html += '</ul>';
	this.divError.append(html);
	this.divError.fadeIn('slow');
    }
}
ErrorView.prototype.disableIfNoFriendsEnough = function(){
    if(Facebook.response.length < 10){
	$('#nbFriends10').attr('disabled', true);
	$('#nbFriends15').attr('disabled', true);
	this.divError.fadeIn('slow');
    }
    else if(Facebook.response.length < 15){
	$('#nbFriends15').attr('disabled', true);
	this.divError.fadeIn('slow');
    }
}