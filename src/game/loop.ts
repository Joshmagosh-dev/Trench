export class GameLoop {
 private last=0;private accumulator=0;
 constructor(private update:(dt:number)=>void,private render:()=>void){requestAnimationFrame(this.frame);}
 private frame=(now:number)=>{if(this.last)this.accumulator+=Math.min((now-this.last)/1000,.1);this.last=now;while(this.accumulator>=1/30){this.update(1/30);this.accumulator-=1/30;}this.render();requestAnimationFrame(this.frame);};
}
