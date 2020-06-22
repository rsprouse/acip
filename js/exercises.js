var index=0;
var numcorrect=0;
var numrun=0;
var exerciseName = "";
var mincorrect=1;
var minrun=1;
var quest = new Array();
var answer = new Array();
var order = new Array();
var soundfiles = new Array();

function initialize() {
    // shuffle the order of the questions
    for (var i=0;i<answer.length;i++) { order[i]=i; }
    for (i=answer.length-1; i>0; i--) { 
	var r = Math.floor(Math.random()*i);
	var temp = order[i];
	order[i] = order[r];
	order[r]= temp; 
    }
    // ask the first question
    ask_question();

}

function ask_question() {
    index = index+1;  
    if (index >= order.length) { index = 0; }
    document.getElementById('answerbox').value = "";
    document.getElementById('feedback').style.backgroundColor = "lightyellow";
    document.getElementById('feedback').innerHTML = "";
    if (document.getElementById('question')) {
	document.getElementById('question').innerHTML = quest[order[index]];
    }
    if (document.getElementById('example')) {
	document.getElementById('example').innerHTML="";
    }
    if (document.getElementById('audio_questions')) {  // if the questions have audio
	var element = document.getElementById('theaudio');
	if (element) {
	    document.body.removeChild(element);
	}
	var aud = document.createElement('audio');
	aud.setAttribute('id','theaudio');
	if (aud != null && aud.canPlayType && aud.canPlayType("audio/wav")) {
	    aud.setAttribute('src',soundfiles[order[index]]+".wav");
	    aud.load();
	} else if (aud!= null && aud.canPlayType && aud.canPlayType("audio/mpeg")) {
	    aud.setAttribute('src',soundfiles[order[index]]+".mp3");
	    aud.load();
	}
	document.body.appendChild(aud);
	document.getElementById('theaudio').play();
    }
}

function check_answer() {
    var myanswer = document.getElementById('answerbox').value;
    var feedback_time;

    if (document.getElementById('example')) {
	document.getElementById('example').innerHTML=example[order[index]];
    }
    if (myanswer.toLowerCase() == answer[order[index]].toLowerCase()) {
	document.getElementById('feedback').innerHTML = "correct";
	numcorrect = numcorrect +1;
	document.getElementById('correct').innerHTML = numcorrect+"/"+mincorrect;
	numrun = numrun+1;
	document.getElementById('run').innerHTML = numrun+"/"+minrun;
	feedback_time=1500;
    } else {
	document.getElementById('feedback').style.backgroundColor = "Tomato";
	document.getElementById('feedback').innerHTML = "sorry: the answer was "+answer[order[index]];
	numrun=0; 
	index = index-1;
	document.getElementById('run').innerHTML = numrun+"/"+minrun;
	feedback_time=3500;
    }
    window.setTimeout(finish,feedback_time);  // show feedback, then on to the next question
}

function finish() {
    if ((numcorrect >= mincorrect) && (numrun >= minrun)) {  // check for completeness
	if (! localStorage.getItem(exerciseName)) {
	    var d = new Date();
	    localStorage.setItem(exerciseName,d);  // remember this date,time
	}
	numcorrect=0;  // reset counters
	numrun=0;
	make_png_cert(exerciseName);      // print certificate
    }  else {
	ask_question();   // do another question
    }
}

function make_png_cert( exname ) {
    var d = localStorage.getItem(exname);

    if (d) {
	var mycanvas = document.createElement('canvas');
	mycanvas.setAttribute('width','452');
	mycanvas.setAttribute('height','112');
	var context = mycanvas.getContext('2d');

	image1 = new Image();    
	image1.addEventListener('load',function () {
	    context.drawImage(image1,1,1);
	    context.font="32pt Times";
	    context.fillText("A Course in Phonetics",20,40);
	    context.font="12pt Times";
	    context.fillText("This document certifies that you completed exercise "+exname, 20, 60);
	    context.fillText("Completion time: "+d, 25,80);
	    context.font="9pt Times";
	    context.fillText(" (save me, print me, show me to your teacher!) ",40,95);
	    context.strokeRect(2,2,449,109);
	    
	    var url = mycanvas.toDataURL();  // make png in-line url
	    
	    // arg IE9 makes this harder than it has to be
	    var win = window.open();  // open a new window
	    win.document.write("<html><body></body></html>");
	    var newImg = win.document.createElement("img");  // add an image
	    newImg.src = url;                                // contents of image is our png
	    win.document.body.appendChild(newImg);
//	    window.open(url);   // if there were no IE this would be all you need
	},false);
        image1.src = "styles/bg_snippet.png";
	return true;
    } else {
	return false;
    }
}