function FacebookController() {
    this.response = {};
}

FacebookController.prototype.getFriends = function() {
    var $this = this;
    FB.api('/me/friends', {fields: 'name,id,location,birthday,hometown'}, function (response) {
	var friendsToFind = [];
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
            if($this.hasHometownAndLocation(data[i])){
                friendsToFind.push({name: data[i].name, hometown: data[i].hometown.name, location: data[i].location.name});
            }
        }
        $this.response = friendsToFind;
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

FacebookController.prototype.hasHometownAndLocation = function(friend) {
    if(friend.hometown == null || friend.location == null)
        return false;
    return true;
}

FacebookController.prototype.takeXFriends = function(friends, limit) {
    var limitFriends = limit;
    var arrayFriend = new Array();
    arrayFriend = friends;
    do{
        var unluckyFriendIndex = Math.random() * (friends.length - 0) + 0;
        arrayFriend.splice(unluckyFriendIndex, 1);
    }while(friends.length > limitFriends)
}

FacebookController.prototype.share = function() {

}