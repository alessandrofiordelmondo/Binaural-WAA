var contextClass = (window.AudioContext || window.webKitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
var audioContext = new contextClass();
var hrtfs = new Array();
var hrtfLen;
var sounds = new Array();
//get HRTF set
function getHRTFs(arrayObject, phpLoader = "./php/get_file.php", hrtfDirectory = '../HRTF/'){
    //arrayObject=	array to fill with hrtf convolever object
    //phpLoader=	file php for hrtf set loading  
    $.getJSON(phpLoader, {URL: hrtfDirectory}, function(data){
	var threshElements = 0;
	$.each(data, function(i, url){
	   if(![".", "..", ".DS_Store"].includes(url)){
		var indicator = /\_A_.*?\d/.exec(url)[0][3];
		var position = parseFloat(/\d{3}/.exec(url)[0]);
		if (indicator === "L"){
		    arrayObject.unshift(new Convolver(-position, hrtfDirectory+url, audioContext));
		} else if (indicator === "R") {
		    arrayObject.push(new Convolver(position, hrtfDirectory+url, audioContext));
		} else {
		    alert("cange name of hrtf sets\nname_A_P###_E_###\nname = set's name\nA = azimuth - P = position (L or R) - ### = degree\nE = elevation - ### = degree");
		}
	    } else {threshElements++};
	});
	hrtfLen = hrtfs.length;	
    });
}
$(document).ready(function(){
    resizeSquare('#room', $(window).height()-110);
    var roomSize = $("#room").width()  
    resizeSquare('.sound', $("#room").height()/10);
    resizeSquare('#head', $("#room").height()/10);
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
    //create set hrtf to the star
    getHRTFs(hrtfs);
    //create 4 sound object
})

