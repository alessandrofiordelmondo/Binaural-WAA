var objectPos = [];
//get position of the objects
function getObjPosition(classObject, head, room, headDirection = direction){	
    var topH = $(head).position().top;
    var leftH = $(head).position().left;
    var sizeR = $(room).height() - $(classObject).height();
    var pos = [[], [], [], []];
    var i = 0;
    $('.sound').map(function(){
	var tPos = $("#"+this.id).position().top;
	var lPos = $("#"+this.id).position().left;
	var H = Math.abs(topH - tPos);
	var W = Math.abs(leftH - lPos);
	pos[i][0] = Math.sqrt(Math.pow(H, 2) + Math.pow(W, 2));	//distance
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
	i++;
    });
    console.log(pos[1][1])
    return pos
}

function cahngeBinauralPosition (azimuth, len){
    //azimut	= in degree (L[0 -> -180] & R[0 -> 180])
    //hrtfs 	= array length
    var pos = ((azimut + 180) / 360 * len);
    var a = Math.floor(pos);
    var A = a%len;
    var b = Math.floor(pos + 1);
    var gainA = Math.abs(a - pos);
    var gainB = Math.abs(b - pos);
    hrtfs[A] = setGain(gainA);
    harfs[B] = setGain(gainB);
}
