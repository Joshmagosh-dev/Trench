import { Battle, clamp } from './model';
import { reinforce } from './ai';
import { fire } from './combat';
import { updateMorale } from './morale';
import { trenchX } from './cover';
import { checkMission } from './mission';
export function step(b:Battle,dt:number){
 if(b.outcome)return;b.time+=dt;b.sp=Math.min(100,b.sp+dt*2.5);
 for(const key of ['smoke','repair','strike'] as const)b.cooldowns[key]=Math.max(0,b.cooldowns[key]-dt);
 reinforce(b,dt);
 for(const l of b.lanes){l.smoke=Math.max(0,l.smoke-dt);l.repair=Math.max(0,l.repair-dt);}
 for(const u of b.units){if(u.hp<=0)continue;updateMorale(u,dt);const dir=u.side===0?1:-1;
 let nearest=1000;for(const v of b.units)if(v.hp>0&&v.side!==u.side&&v.lane===u.lane)nearest=Math.min(nearest,Math.abs(v.x-u.x));
 if(u.morale<25){u.x+=Math.sign(trenchX(u.side)-u.x)*dt*25;}
 else if(u.suppression<45){if(nearest>240)u.x+=dir*dt*19;}
 fire(b,u,dt);
 if(u.x>945||u.x<55){b.breaches[u.side]++;u.hp=0;u.x=-999;}
 }
 for(let i=b.units.length-1;i>=0;i--)if(b.units[i].hp<=0){const u=b.units[i];if(u.x!==-999)b.losses[u.side]++;b.units.splice(i,1);}
 for(let i=b.effects.length-1;i>=0;i--){b.effects[i].life-=dt;if(b.effects[i].life<=0)b.effects.splice(i,1);}
 for(let i=0;i<4;i++){let blue=0,red=0;for(const u of b.units)if(u.lane===i){if(u.side===0)blue+=u.x;else red+=u.x;}let nb=0,nr=0;for(const u of b.units)if(u.lane===i){if(u.side===0)nb++;else nr++;}b.lanes[i].front=clamp(((nb?blue/nb:220)+(nr?red/nr:780))/2,100,900);}
 checkMission(b);
}
