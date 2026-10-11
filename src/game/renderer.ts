import { Battle } from './model';
export class Renderer {
 private c:CanvasRenderingContext2D;private terrain:HTMLCanvasElement;
 constructor(private canvas:HTMLCanvasElement){this.c=canvas.getContext('2d')!;this.terrain=document.createElement('canvas');this.terrain.width=1000;this.terrain.height=560;const c=this.terrain.getContext('2d')!;c.fillStyle='#252820';c.fillRect(0,0,1000,560);
 let seed=77;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<2500;i++){c.fillStyle=i%3?'#303128':'#191e19';c.fillRect(random()*1000,random()*560,random()*4+1,2);}
 for(let i=0;i<55;i++){const x=random()*1000,y=random()*560,r=4+random()*16;c.fillStyle='#1c211b';c.beginPath();c.ellipse(x,y,r,r*.55,0,0,Math.PI*2);c.fill();c.strokeStyle='#39392c';c.stroke();}
 }
 draw(b:Battle){const c=this.c;const dpr=Math.min(devicePixelRatio||1,2);const rect=this.canvas.getBoundingClientRect();const w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}c.setTransform(w/1000,0,0,h/560,0,0);c.drawImage(this.terrain,0,0);
 c.font='11px monospace';c.textBaseline='middle';
 for(let lane=0;lane<4;lane++){const y=lane*140;const l=b.lanes[lane];
 c.fillStyle=lane===b.selected?'#b5bb8510':'#00000010';c.fillRect(0,y,1000,140);c.strokeStyle='#6b715733';c.beginPath();c.moveTo(0,y);c.lineTo(1000,y);c.stroke();
 c.fillStyle='#b2b8a3';c.fillText(`0${lane+1}`,12,y+18);
 c.strokeStyle='#b0b89855';c.setLineDash([4,7]);c.beginPath();c.moveTo(l.front,y+8);c.lineTo(l.front,y+132);c.stroke();c.setLineDash([]);
 for(let side=0;side<2;side++){const x=side===0?220:780;c.fillStyle='#101713';c.fillRect(x-24,y+8,48,124);c.strokeStyle=side===0?'#558da777':'#b5686377';c.strokeRect(x-24,y+8,48,124);
 for(let n=0;n<12;n++){c.fillStyle=n<l.cover[side]/100*12?'#69654b':'#37392c';c.fillRect(x+(side===0?25:-36),y+9+n*10,11,7);}
 c.fillStyle=side===0?'#81b6ce':'#cb8981';c.fillText(`${Math.round(l.cover[side])}%`,x-12,y+128);
 }
 if(l.repair>0){c.strokeStyle='#acc798';c.strokeRect(190,y+5,70,130);}
 if(l.smoke>0){for(let k=0;k<7;k++){c.fillStyle='#b4bbad22';c.beginPath();c.ellipse(330+k*55+Math.sin(b.time+k)*12,y+70,67,40,0,0,Math.PI*2);c.fill();}}
 if(lane===b.selected){c.strokeStyle='#c3cc8d';c.lineWidth=2;c.strokeRect(2,y+2,996,136);c.lineWidth=1;}
 }
 for(const u of b.units){const y=u.lane*140+70+u.offset;c.strokeStyle=u.side===0?'#8bc3df':'#df9288';c.fillStyle='#1c2622';c.lineWidth=1.5;c.beginPath();c.arc(u.x,y,6,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(u.x,y);c.lineTo(u.x+(u.side===0?12:-12),y);c.stroke();
 if(u.suppression>45){c.strokeStyle='#d6b86c';c.beginPath();c.moveTo(u.x-5,y-11);c.lineTo(u.x+5,y-11);c.stroke();}
 if(u.morale<25){c.fillStyle='#d6b86c';c.fillText('!',u.x-3,y-18);}c.lineWidth=1;
 }
 for(const e of b.effects){const y=e.lane*140+70+e.offset;
 if(e.kind==='shot'){c.strokeStyle='#d6c69d';c.beginPath();c.moveTo(e.x+e.dir*12,y);c.lineTo(e.x+e.dir*26,y);c.stroke();}
 else {c.fillStyle=e.kind==='strike'?'#b5a88966':'#aeb19b66';c.beginPath();c.ellipse(e.x,y,e.kind==='strike'?80*(1-e.life)+12:4,e.kind==='strike'?38:3,0,0,Math.PI*2);c.fill();}}
 for(let i=0;i<4;i++){const x=(b.time*7+i*293)%1250-125;const g=c.createRadialGradient(x,90+i*130,1,x,90+i*130,130);g.addColorStop(0,'#bbc9b007');g.addColorStop(1,'#bbc9b000');c.fillStyle=g;c.fillRect(x-130,i*130-40,260,260);}
 }
}
