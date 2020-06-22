// must assume the existence of some variables (defined in exercises.js)

exerciseName = "9G";
mincorrect=20;
minrun=3;
var namebase="course/chapter9/cardinal/";
var n = 18;

for (var i=0; i<n; i++) {
    token = i+1
    if (i<8) { 
	soundfiles[i]=namebase+"i"+token.toString();    answer[i]=token.toString();
    } else {
	soundfiles[i]=namebase+"c"+token.toString();    answer[i]=token.toString();
    }
    soundfiles[i+n]=namebase+"dj"+token.toString();    answer[i+n]=token.toString();
}







