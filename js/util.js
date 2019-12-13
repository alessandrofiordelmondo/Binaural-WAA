function audioFileLoader(url, obj, audioContext){
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = "arraybuffer";
    req.onload = function(){
   	audioContext.decodeAudioData(req.response, function(data) { obj.buffer = data; });
    };
    req.send()
}

function fromInputAudioLoader(file, obj, audioContext){
    var audiodata = new FileReader();
    audiodata.readAsArrayBuffer(file[0]);
    audiodata.onload = function(e){
	audioContext.decodeAudioData(e.target.result, function(data){ obj.buffer = data; })
    }
}
