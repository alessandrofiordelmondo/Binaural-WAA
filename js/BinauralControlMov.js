var sizeRoom = 10;	//meter
var objectPos = [];
//get position of the objects
function getObjPosition(classObject, head, room, headDirection = direction){	
    var topH = $(head).position().top;
    var leftH = $(head).position().left;
    var sizeR = $(room).height() - $(classObject).height();
    var pos = [[], [], [], []];
    var i = 0;
    $(classObject).map(function(){
	var tPos = $("#"+this.id).position().top;
	var lPos = $("#"+this.id).position().left;
	var H = Math.abs(topH - tPos);
	var W = Math.abs(leftH - lPos);
	pos[i][0] = (Math.sqrt(Math.pow(H, 2) + Math.pow(W, 2)))	//distance
	if (tPos > topH && lPos > leftH){
	    pos[i][1] = (180 - (Math.asin(W/pos[i][0])*180/Math.PI)) - headDirection;
	} else if (tPos > topH && lPos < leftH){
	    pos[i][1] = ((Math.asin(W/pos[i][0])*180/Math.PI) + 180) - headDirection;
	} else if (tPos < topH && lPos < leftH){
	    pos[i][1] = (360 - (Math.asin(W/pos[i][0])*180/Math.PI)) - headDirection;
	} else {
	    pos[i][1] = Math.asin(W/pos[i][0])*180/Math.PI - headDirection;
	}
	if (pos[i][1] < 0){  pos[i][1] += 360; }
	if (pos[i][1] > 180) { pos[i][1] = - (360 - pos[i][1])}
	if (sounds[i] != undefined){ 
	    sounds[i].distance = pos[i][0]/sizeR * sizeRoom; 
	    changeBinauralPosition(sounds[i], pos[i][1])
	}
	i++;
    });
    return pos
}

function changeBinauralPosition(sound, azimuth){
    var position = ((azimuth + 180)  / 360) * hrtfLen;
    var a = Math.floor(position);
    var b = Math.floor(position + 1);
    var A = a%hrtfLen;
    var B = b%hrtfLen;
    var gainA = Math.abs(a - position);
    var gainB = Math.abs(b- position);
    sound.setGain(A, gainA);
    sound.setGain(B, gainB);
    if (A != sound.controlArray[0] && B != sound.controlArray[0]) {sound.setGain(sound.controlArray[0], 0)};
    if (A != sound.controlArray[1] && B != sound.controlArray[1]) {sound.setGain(sound.controlArray[1], 0)};
    sound.controlArray = [A, B];
}
