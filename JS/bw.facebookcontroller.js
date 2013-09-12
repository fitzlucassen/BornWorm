function FacebookController() {
    this.response = {};
}

FacebookController.prototype.getFriends = function() {
    var $this = this;
    FB.api('/me/friends', {fields: 'name,id,location,birthday,hometown'}, function (response) {
	var divTarget = $('.friends-list-container');
	var data = response.data;
	$this.response = data;
	for (var i = 0; i < data.length; i++) {
	    var firstname = data[i].name.split(" ")[0];
	    var lastname = "";
	    var lastnameArray = data[i].name.split(" ");
	    
	    lastnameArray.splice(lastnameArray[0], 1);
	    for (var j = 0; j < lastnameArray.length; j++) {
		lastname += lastnameArray[j] + " ";
	    }
	    if (firstname.length > 13) {
		firstname = firstname.substring(0, 13);
		firstname += "...";
	    }
	    if (lastname.length > 13) {
		lastname = lastname.substring(0, 13);
		lastname += "...";
	    }
	    var divContainer = $('<div>', { id: data[i].id });
	    
	    divContainer.html('<a href="#" class="fb-friend-img" ><img width="40" height="40" src="http://graph.facebook.com/' + data[i].id + '/picture" /></a><a href="#" class="fb-friend-name">' + firstname + '<br />' + lastname + '</a>');
	    divTarget.append(divContainer);
	}
    });
}

FacebookController.prototype.connect = function() {
    var $this = this;
    FB.login(function(response) {
	if (response.authResponse) {
	    var access_token = FB.getAuthResponse()['accessToken'];
	    console.log('Access Token = '+ access_token);
	    
	    $this.getFriends()
	}
	else {
	    console.log('User cancelled login or did not fully authorize.');
	}
    },{scope: 'friends_location, friends_hometown'});
}

FacebookController.prototype.hasHometownFriend = function() {
    
}

FacebookController.prototype.share = function() {

}