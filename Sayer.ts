const synth = window.speechSynthesis;
export class Sayer {
  pitch = 1;
  speed = 1;
  voice: SpeechSynthesisVoice;

  static enabled() {
    return !!synth;
  }
  constructor() {
    this.voice = this.voices[~~(Math.random() * this.voices.length)];
  }
  get voices() {
    return window.speechSynthesis.getVoices();
  }
  async say(text: string):Promise<void> {
    function sorry(txt = '') {
      throw new Error(txt || 'No speech synth is found');
    }
    return new Promise(back=>{
      if (!Sayer.enabled) {
        sorry();
        back();
      }
      if (text) {
        const utterThis = new SpeechSynthesisUtterance(text);
  
        utterThis.onend = (event) => {
          back();
          // console.log('SpeechSynthesisUtterance.onend');
        };
        utterThis.onerror = (event) => sorry();
        utterThis.pitch = this.pitch;
        utterThis.rate = this.speed;
  
        synth.speak(utterThis);
      } else{
         sorry('nothing to say');  
         back();
        }
    });
  }
}
