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
    self.gain = self.audioContext.createGain();
    self.gain.gain.value = 0;
    self.constant = 0.1;//setTargetAtTime variable
    self.gain.connect(self.conv);
    self.conv.connect(self.audioContext.destination)
    self.setGain = function(val){
	self.gain.gain.setTargetAtTime(val, self.currentTime, self.constant);
    }
}
//sound object
function Sound(inputFile, audioContext){
    var self = this
    self.inputFile = inputFile;
    self.audioContext = audioContext;
    self.currentTime = audioContext.currentTime;
    self.sound = self.audioContext.createBufferSource();
    fromInputAudioLoader(self.inputFile, self.sound, self.audioContext);
    self.gain = self.audioContext.createGain();
    self.gain.gain.value = 0;
    self.constant = 0.1;
    self.sound.connect(self.gain);
    self.connect = function(destination){
	self.gain.connect(destination);
    }
    self.start = function(loop = true){
	self.sound.loop = loop;
	self.sound.start();
    }
    self.stop = function(){
	self.sound.stop();
    }
    self.setGain = function(val){
	self.gain.gain.setTargetAtTime(val, self.currentTime, self.constant);
    }
}
