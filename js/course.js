
// functions to place spectrograms on the screen
var yloc;
var xloc;

function showspec(pngfile,e) {  // called with oncontextmenu = right click

    if (e.shiftKey || e.altKey) {  // <shift><right click> opens sound file as target
	var wav = pngfile.replace("png","wav");
	window.open("http://linguistics.berkeley.edu/~kjohnson/A_Course_in_Phonetics/"+wav);
	return true;
    }

    if ($("#specdiv").css("display") == "none") {
	document.getElementById("spectrogram").src=pngfile;

	yloc = e.pageY+20;
	xloc = e.pageX;

	$("#specdiv").show();
    }
    else {
	$("#specdiv").hide();
    }
    return true;
}

function position_sgram() {
	var maxx = 1300;
	var thing = document.getElementById("specdiv");
	var specwidth = thing.clientWidth;
	
	xloc = xloc-(specwidth/2);

	if (xloc < 1) {xloc=1;}
	if (xloc+specwidth > maxx) {xloc = maxx-specwidth;}
    
	thing.style.left = xloc + 'px';
	thing.style.top = yloc + 'px';

	$("#specdiv").show();
}

// function to toggle maps over an image - thus, insert new "area" links
function changeTalker(id,map1,map2) {
    var map = document.getElementById(id).useMap;
    if (map == map1) {document.getElementById(id).useMap=map2;}
    else {document.getElementById(id).useMap=map1;}
}

function canPlayWav () {
    var a = document.createElement('audio');
    var canplay = !!(a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));

    if (!canplay) {
	document.getElementById("noWav").innerHTML="<p>Unfortunately it looks like your browswer won't be able to play the sound files here.  This probably means that you are using Internet Explorer. I know it is a pain, but try using Chrome, Safari, or Firefox.  Preferably use Chrome because the <u><a href='appendix/using_the_site/about_the_recorder.html'>web recorder</a></u> works in Chrome.</p>";
    }

}