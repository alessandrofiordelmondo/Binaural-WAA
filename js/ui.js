var roomSize;
var headDeg = 0;
//function for resize the square implement\ed
function resizeSquare(div, px){
    $(div).height(px);
    $(div).width(px);
}
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
		objectRot(div, 360 + (headDeg%360))
		objectRot(div, 360 + (headDeg%360))
	    }else{
	    	objectRot(div, headDeg % 360)
	    }
	
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
//Rotate image
function objectRot(div, degree){
   $({degrees: degree}).animate({degrees: degree}, {
	duration: 2000,
	step: function(now) {
	    $(div).css({
		transform: 'rotate(' + now + 'deg)'
	    });
	}
    });
}
$(document).ready(function(){
    resizeSquare('#room', $(window).height() -110);
    var roomSize = $("#room").width()  
    console.log(roomSize);
    resizeSquare('.sound', $("#room").height()/10);
    // inizialize with random position for the sound object
    $("#s1").css(
	{'left': Math.random()*($("#room").width()-$("#s1").width()) + 'px', 
	'top':Math.random()*($("#room").height()-$("#s1").height()) + 'px'}
    )
    $("#s2").css(
	{'left': Math.random()*($("#room").width()-$("#s2").width()) + 'px', 
	'top':Math.random()*($("#room").height()-$("#s2").height()) + 'px'}
    )
    $("#s3").css(
	{'left': Math.random()*($("#room").width()-$("#s3").width()) + 'px', 
	'top':Math.random()*($("#room").height()-$("#s3").height()) + 'px'}
    )
    $("#s4").css(
	{'left': Math.random()*($("#room").width()-$("#s4").width()) + 'px', 
	'top':Math.random()*($("#room").height()-$("#s4").height()) + 'px'}
    )
    $("#head").css(
	{'left':$("#room").width()/2 + 'px', 
	'top':$("#room").height()/2 + 'px'}
    )
	
    objectMov('#s1');
    objectMov('#s2');
    objectMov('#s3');
    objectMov('#s4');
    objectMov('#head', false, true);
})

$(window).resize(function(){
    var wH = $(this).height()  
    var rH = $('#room').height();
    var scale = rH/roomSize;
    console.log(rH, scale)
    resizeSquare('#room', wH - 110);
    resizeSquare('.sound', rH/10);
    resetPosition("#s1", scale);
    resetPosition("#s2", scale);
    resetPosition("#s3", scale);
    resetPosition("#s4", scale);
    resetPosition("#head", scale);
    roomSize = rH;
    
})
