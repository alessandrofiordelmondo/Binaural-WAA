var roomSize;
var headDeg = 0;
var direction = 0;
var objectPos = [];
//resize the size of the object
function resizeSquare(div, px){
    $(div).height(px);
    $(div).width(px);
}
//reset the position of the object
function resetPosition(div, scale){
    var divLeft = $(div).position().left * scale;
    var divTop = $(div).position().top * scale;
    $(div).css(
	{'left': divLeft + 'px', 
	'top': divTop + 'px'}
    )
}
//function for move the sound object
function objectMov(div, visualSel = true, rotate = false){
    var drag = false;
    var iX, iY;
    if(rotate){
	$(window).keypress(function(key){
	    if (key.keyCode == 100){
		headDeg += 3;
	    }
	    else if (key.keyCode == 97){
		headDeg -= 3;
	    }
	    if (headDeg < 0){
		direction = objectRot(div, 360 + (headDeg%360))
	    }else{
	    	direction = objectRot(div, headDeg % 360)
	    }
    	    objectPos = getObjPosition(".sound", "#head", "#room")
	})
    }
    $(div).mousedown(function(e){
    	drag = true;
    	iX = e.clientX - this.offsetLeft;
    	iY = e.clientY - this.offsetTop;
	if(visualSel){$(div).css({'border': '4px solid #222222'})}
    	this.setCapture && this.setCapture();
    	return false
    })
    $(div).parent().mousemove(function(e){
    	if(drag){
	    var e = e 
	    var oX = e.clientX - iX;
	    var oY = e.clientY - iY;
	    if (oX <= $(div).parent().width() - $(div).width() && oX >= 0){$(div).css({'left': oX + 'px'})};
	    if (oY <= $(div).parent().height() - $(div).height() && oY >= 0){$(div).css({'top': oY + 'px'})};
    	    objectPos = getObjPosition(".sound", "#head", "#room")
	    return false
    	}
    })
    $(document).mouseup(function(e){
	if(visualSel){$(div).css({'border': 1 + 'px solid #000000'})}
	drag = false;
	$(div)[0].releaseCapture();
	e.cancelBubble = true;
    })
}
//Rotate object (only fo the head)
function objectRot(div, degree){
   $({degrees: degree}).animate({degrees: degree}, {
	duration: 2000,
	step: function(now) {
	    $(div).css({
		transform: 'rotate(' + now + 'deg)'
	    });
	}
    });
    return degree;
}
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
	if (pos[i][1] > 180) { pos[i][1] = - (360 - pos[0][1])}
	i++;
    });
    console.log(pos[0][1])
    return pos
}
//object size and position reset in the resizing of the main window
$(window).resize(function(){
    var wH = $(this).height()  
    var rH = $('#room').height();
    var scale = rH/roomSize;
    resizeSquare('#room', wH - 110);
    resizeSquare('.sound', rH/10);
    resizeSquare('#head', rH/10);
    resetPosition("#s1", scale);
    resetPosition("#s2", scale);
    resetPosition("#s3", scale);
    resetPosition("#s4", scale);
    resetPosition("#head", scale);
    roomSize = rH;
})

