import { Battle, Unit } from './model';
import { protection } from './cover';
export function fire(b:Battle,u:Unit,dt:number){
 u.shot-=dt;if(u.shot>0||u.morale<15)return;
 let target:Unit|undefined;let distance=370;
 for(const v of b.units){const d=Math.abs(v.x-u.x);if(v.hp>0&&v.side!==u.side&&v.lane===u.lane&&d<distance){target=v;distance=d;}}
 if(!target)return;
 u.shot=0.8+b.random()*0.9+(u.suppression>45?1:0);
 b.effects.push({x:u.x,lane:u.lane,offset:u.offset,life:0.12,kind:'shot',dir:Math.sign(target.x-u.x)});
 if(b.lanes[u.lane].smoke>0&&b.random()<0.7)return;
 target.suppression=Math.min(100,target.suppression+18);target.morale=Math.max(0,target.morale-3);
 b.effects.push({x:target.x+(b.random()-.5)*18,lane:u.lane,offset:target.offset,life:0.25,kind:'impact',dir:0});
 if(b.random()<0.3*(1-protection(b,target))){target.hp-=34;target.morale=Math.max(0,target.morale-12);}
 b.lanes[u.lane].cover[target.side]=Math.max(0,b.lanes[u.lane].cover[target.side]-.18);
}
