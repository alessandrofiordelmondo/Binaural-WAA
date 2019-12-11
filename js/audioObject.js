//convolver object
//load and use the HRTF set
function Convolver(id, url, audioContext){
    var self = this;
    self.id = id;
    self.url = url;
    self.audioContext = audioContex;
    self.currentTime = audioContext.currentTime;
    self.conv = self.audioContext.createConvolver();
    self.conv.buffer = audioFileLoader(url); 
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
function Sound(id, url, audioContext){
    var self = this
    self.id = id;
    self.url = url;
    self.audioContext = audioContext;
    self.sound = self.audioContext.createBufferSource();
    self.sound.buffer = audioFileLoader(url);
    self.gain = self.audioContext.createGain();
    self.gain.gain.value = 0;
    self.constant = 0.1;
    self.sound.connect(self.gain);
    self.setGain = function(val){
	self.gain.gain.setTargetAtTime(val, self.currentTime, self.constant);
    }
}
