function audioFileLoader(url){
    var audiodata;
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = "arraybuffer";
    req.onload = function(){
   	cntx.decodeAudioData(req.response, function(data) { audiodata = audioData });
    };
    req.send()
    return audiodata;
}
