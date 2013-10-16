function MainView() {

}

MainView.prototype.appendResult = function(result){
    $('#distance').html(result + 'km de <br />' + Facebook.response[cptFriends-1].hometown);
    $('#result').fadeIn('slow');
}

MainView.prototype.appendNewName = function(name, picture){
    $('.newimage').removeClass('newimage');
    $('#friendName').prepend('<img class="newimage" src="" alt=""/>' + name + '<br/><br/>');
    $('#friend .newimage').attr('src', picture);
    $('#friend .newimage').attr('alt', 'Photo de ' + name);

    $('#friend').fadeIn('slow');
    $('#score').fadeIn('slow');
}
MainView.prototype.refreshAfterConnect = function(){
    $('.facebook').css({display:'none'});
    $('#explanationPresentation').fadeIn('slow');
    $('#explanationPresentation input').attr('disabled', true);
}
MainView.prototype.startGame = function(){
    $('#explanation').css({display: 'none'});
    $('#map-canvas').css({display: 'block'});
    $('#menu-canvas').animate({width:'0%'},1000);
    $('header').fadeOut('slow');
    $('#liste-friends').css({'max-height': clientHeight});
    
    setTimeout(function(){
	$('#menu-bar').css({display:'block'});
	$('#menu-canvas').animate({width:'350px'});
    },1000);
}
MainView.prototype.nextFriend = function(){
    $('#result').css({display: 'none'});
    $('#friend').css({display: 'none'});
}
MainView.prototype.appendScore = function(score){
    $('#scoreLabel').html(score + ' points');
}
MainView.prototype.appendShare = function(score){
    $('#gameOver').css({'margin-top':(clientHeight/2-60)});
    var m = document.createElement('meta');
    m.setAttribute('property', 'og:description');
    m.setAttribute('content', 'J\'ai fait ' + score + ' points à Bornworm. Peux-tu faire mieux ?');
    document.getElementsByTagName('head')[0].appendChild(m);
    
    $('#score').append('<br/><p><a href="#" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href) + '\', \'facebook-share-dialog\', \'width=626,height=436\');return false;">Partagez votre score sur Facebook</a></p>');
    $('#score').append('<br/><div id="invitation-module"></div>');
}
MainView.prototype.limitAccess = function(){
    $('.questionStart').html('Vous devez aimer la page "Bornworm" pour pouvoir jouer. Ensuite, rafraichissez la page.');
    $('.nbFriends, .nbFriends + label').css({display:'none'});
}
MainView.prototype.appendRequest = function(){
    $('#invitation-module').html('<p><a href="#" onclick="window.open(\'https://www.facebook.com/dialog/apprequests?app_id=426080854175488&message=' + encodeURIComponent('Viens me défier à Bornworm !') + '!&redirect_uri=http://bornworm.passanger.fr/\', \'facebook-requst-dialog\', \'width=1000,height=436\');return false;">Et invitez vos amis à vous défier.</a></p>');
    $('#invitation-module').append('<br/><p><a href="#" onclick="window.location.reload();">Rejouer</a></p>');
}