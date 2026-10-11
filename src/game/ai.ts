import { Battle, Side } from './model';
export function reinforce(b:Battle,dt:number){
 for(let lane=0;lane<4;lane++)for(const side of [0,1] as Side[]){
 const l=b.lanes[lane];l.spawn[side]-=dt;
 if(l.spawn[side]<=0){l.spawn[side]=side===0?4.8:4.3;
 let count=0;for(const u of b.units)if(u.side===side&&u.lane===lane)count++;
 if(count<10)b.units.push({id:b.nextId++,side,lane,x:side===0?85:915,offset:(b.random()-.5)*54,hp:100,morale:85,suppression:0,shot:b.random()});
 }
 }
}
