//sound Object
function SoundObject(inputFile, audioContext){
    var self = this;
    self.inputFile = inputFile;
    self.audioContext = audioContext;
    self.currentTime = self.audioContext.currentTime;
    self.sound = self.audioContext.createBufferSource();
    fromInputAudioLoader(self.inputFile, self.sound, self.audioContext);
    self.controlGains = new Array();
    self.controlArray = [0, 1]; 
    self.constant = 0.1;
    self.distance;
    self.connectHRTF = function(setHertfsConvolver){
	for (var i = 0; i < setHertfsConvolver.length; i++){
	    self.controlGains[i] = self.audioContext.createGain();
	    self.controlGains[i].gain.value = 0;
	    self.sound.connect(self.controlGains[i]);
	    self.controlGains[i].connect(setHertfsConvolver[i].conv);
	}
    }
    self.setGain = function(gainNode, val){
	var distVal = val / self.distance;
	self.controlGains[gainNode].gain.setTargetAtTime(distVal, self.currentTime, self.constant)
    }
    self.start = function(loop = true){
	self.sound.loop = loop;
	self.sound.start();
    }
    self.stop = function(){ self.stop(); }
}
//convolver object
//load and use the HRTF set
function Convolver(id, url, audioContext){
    var self = this;
    self.id = id;
    self.url = url;
    self.audioContext = audioContext;
    self.currentTime = audioContext.currentTime;
    self.conv = self.audioContext.createConvolver();
    audioFileLoader(self.url, self.conv, self.audioContext); 
    self.conv.connect(self.audioContext.destination)
}
