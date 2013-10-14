function MainView() {

}

MainView.prototype.appendResult = function(result){
    $('#distance').html(result + 'km de ' + Facebook.response[cptFriends-1].hometown);
    $('#result').fadeIn('slow');
}

MainView.prototype.appendNewName = function(name){
    $('#friendName').html(name);
    $('#friend').fadeIn('slow');
    $('#score').fadeIn('slow');
}
MainView.prototype.refreshAfterConnect = function(){
    $('.facebook').css({display:'none'});
    $('#explanationPresentation').fadeIn('slow');
}
MainView.prototype.startGame = function(){
    $('#explanation').css({display: 'none'});
    $('#map-canvas').css({display: 'block'});
}
MainView.prototype.nextFriend = function(){
    $('#result').css({display: 'none'});
    $('#friend').css({display: 'none'});
}
MainView.prototype.appendScore = function(score){
    $('#scoreLabel').html(score + ' points.');
}
MainView.prototype.appendShare = function(score){
    var m = document.createElement('meta');
    m.setAttribute('property', 'og:description');
    m.setAttribute('content', 'J\'ai fait ' + score + ' points à Bornworm. Peux-tu faire mieux ?');
    document.getElementsByTagName('head')[0].appendChild(m);
    
    $('#score').html('<a href="#" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href) + '\', \'facebook-share-dialog\', \'width=626,height=436\');return false;">Partagez votre score sur Facebook</a>');
}