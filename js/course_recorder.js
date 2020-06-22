// functions to provide a recorder on the page
// pages that include this .js module will ask permission to use the microphone

$(function(){
    $("#recorder").load("recorder.html");
});

var audio_context,recorder;
window.onload = function init() {
    try {
    // webkit shim
	window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.mozURL;

	audio_context = new AudioContext();
	console.log('Audio context set up.');
	console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
	console.warn('No web audio support in this browser!');
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
	console.warn('No live audio input: ' + e);
    });
};

function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');

    recorder = new Recorder(input);
    console.log('Recorder initialised.');
    $("#recorder").show();  // user clicks "allow" and the recorder object appears
}


function startRecording(button) {
    recorder && recorder.record();
    button.disabled = true;
    button.nextElementSibling.disabled = false;
    button.value="Recording";
    console.log('Recording...');
}

function stopRecording(button) {
    recorder && recorder.stop();
    button.disabled = true;
    button.previousElementSibling.disabled = false;
    console.log('Stopped recording.');
    document.getElementById("startbutton").value="start recording";

    recorder && recorder.exportWAV(handleWAV.bind(this));

    recorder.clear();
}

//  note an <audio element with id "recorded_audio" must be present
function handleWAV(blob) {
    var url = URL.createObjectURL(blob);
    var audio = document.getElementById('recorded_audio');
    audio.src = url;

}
