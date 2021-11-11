
let playIcon = $('#play-icon');
let pauseIcon = $('#pause-icon');
let player = $('#player');
let mediaType = $('#media-type');
let nowPlaying = $('#now-playing');
let controls = $('#media-controls');
let currentMediaType = "song";

let currentSongIndex = 0;
let currentFunIndex = 0;
let playing = false;


let songs = ["Matt Maltese - As the World Caves In.mp3",
"HER - Best Part Audio ft Daniel Caesar.mp3",
"KLOUD - LOVE ME feat Gabriel Paris.mp3",
"The Weeknd - Coming Down.mp3",
"GET YOU - DANIEL CAESAR FT KALI UCHIS.mp3",
"Poison - Brent Faiyaz.mp3",
"Bring Me The Horizon - Can You Feel My Heart.mp3",
"The Weeknd - What You Need.mp3",
"Sade - No Ordinary Love.mp3",
"Sade - Hang On To Your Love.mp3",
"Bring Me The Horizon  - Follow You.mp3",
"Pink Pantheress - Break It Off.mp3",
"Pinkpantheress  - Just for me.mp3",
"Doja Cat - Woman.mp3",
"Calvin Harris - How Deep Is Your Love.mp3",
"SZA - Country.mp3",
"SZA - Joni (Slowed)",
"XMUGEN.mp3",
"Domal.mp3"];

let funs = ["sleepy baby.mp3",
"That Bitch and her bottle.mp3"]


$(document).ready(()=>{
	console.log('page loaded, magic ensues');

	// Put first song in array into src attr of audio element
	player.attr('src', "music/"+songs[currentSongIndex]);
	nowPlaying.text(cleanName(songs[currentSongIndex]));

	playing = false;

})

function handleBold(el){
	$(".media-select .button").removeClass('selected')
	$(el).addClass('selected');
}

// Listen for media-select button presses
function playSong(el){

	currentMediaType = 'song'
	console.log("Doğa wants to play a song");

	handleBold(el)

	mediaType.text('Song Mode')

	nowPlaying.text(cleanName(songs[currentSongIndex]));

	player[0].pause()

	player.attr('src', "music/"+songs[currentSongIndex]);

	pausePlayer();

	controls.show();
}

function playFunTime(el){
	console.log("Doğa wants to play a Fun time");

	currentMediaType = "fun"

	handleBold(el)

	controls.show()

	mediaType.text('Fun Times...')

	nowPlaying.text(cleanName(funs[currentFunIndex]));

	pausePlayer();

	player.attr('src', "funtimes/"+funs[currentFunIndex]);
	
}

function freakout(el){
	console.log("Doğa wants attention");
	handleBold(el)
	mediaType.text('Attention is on its way, Jamal is being notified... hang tight, deep breaths!')

	player[0].pause()

	nowPlaying.text('')

	controls.hide()

	sendPush();
}

function playPauseClicked(el){
	console.log("Doğa pressed play/pause");
	// console.log('el:', el);

	// find icon that ISN'T hidden
	let clicked = $(el).find('img').not(".hidden")[0];
	clicked = $(clicked).attr('id');
	// console.log("element clicked was:", clicked);

	if (clicked === "play-icon") {
		// Doğa wants to play the media
		player[0].play();

		// show media-playing
		// $('#media-playing').visible();

		if (currentMediaType === "song") {
			nowPlaying.text(cleanName(songs[currentSongIndex]))
		} else {
			nowPlaying.text(cleanName(funs[currentFunIndex]));
		}
		

		playing = true

		// hide play-icon, show pause-icon
		playIcon.addClass('hidden');
		pauseIcon.removeClass('hidden');

	} else {

		// Doğa is pausing
		player[0].pause();

		playing = false;

		playIcon.removeClass('hidden')
		pauseIcon.addClass('hidden');
	}
}

function nextClicked(){
	console.log('Doğa clicked next');

	if (currentMediaType === "song") {
			// incrememnt currentSongIndex
			currentSongIndex++
			currentSongIndex > songs.length ? currentSongIndex = 0 : true;
			player.attr('src', "music/"+songs[currentSongIndex]);
			nowPlaying.text(cleanName(songs[currentSongIndex]));
		} else {
			currentFunIndex++;
			currentFunIndex > funs.length ? currentFunIndex = 0 : true;
			player.attr('src', "funtimes/"+funs[currentFunIndex]);
			nowPlaying.text(cleanName(funs[currentFunIndex]));
		}

	if (playing === true) {
		// things are playing
		player[0].play();
	}
	
}

function prevClicked(){
	console.log("Doğa clicked previous")

	if (currentMediaType === "song"){
		currentSongIndex--;
		currentSongIndex < 0 ? currentSongIndex = 0 : true;

		player.attr('src', "music/"+songs[currentSongIndex]);
		nowPlaying.text(cleanName(songs[currentSongIndex]));
	} else {
		currentFunIndex--;
		currentFunIndex < 0 ? currentFunIndex = 0 : true;
		player.attr('src', "funtimes/"+funs[currentFunIndex]);
		nowPlaying.text(cleanName(funs[currentFunIndex]));
	}
	

	if (playing === true) {
		// things are playing
		player[0].play();
	}

}



player.on("ended", ()=>{
	console.log("player has ended, hide play button, show pause");
	pausePlayer();
})

function pausePlayer(){
	player[0].pause()
	pauseIcon.addClass('hidden');
	playIcon.removeClass('hidden');
	playing = false;
}


function sendPush(){
	let push = {
		"active": "true",
		"type": "note",
		"title": "Urgent",
		"body": "Doğas needs attention!",
		"email": "jdassrath@gmail.com"
	}

	let headers = {
		'Content-Type': 'application/json'
	}
	$.ajax({
	         url: "https://api.pushbullet.com/v2/pushes",
	         data: JSON.stringify(push),
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader('Access-Token', 'o.85hLDliV6pDxGYnf1ulO4546NoB4Iq4i').setRequestHeader('Content-Type','application/json');},
	         success: function() { alert("I've been notified baby, will call as soon as I can! I love You :>"); }
	      });
}

// Replace placeholder texts and urls with your own values:

//https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?
// title=If%20this%20is%20set%20will%20create%20notification&icon=http://example.com/icon.png&
// text==:=command text=:=etc&
//  url=http://example.com&
// clipboard=Some+Text&
// file=http://publicurl.com/image.jpg,http://publicurl.com/image2.jpg&
// deviceId=9916eb2045544b20a9b3c3af1f0e0b3e&
// apikey=




function cleanName(name){
	name = name.replace('.mp3', '')
	name = name.replace('.aac', '')
	return name
}


jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
