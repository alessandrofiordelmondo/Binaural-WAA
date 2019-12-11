function resizeSquare(div){
	$(div).css({'width': $(this).height() + 'px'})
}
$(document).ready(function(){
    resizeSquare('#room');
/*
    var roomHeight = $("#room").height();
    $("#room").css({'width':roomHeight+'px'})
    console.log(roomEight);
*/
})

$(window).resize(function(){
    resizeSquare('#room');
})
