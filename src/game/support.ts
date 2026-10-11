import { Battle } from './model';
export const actions={smoke:{label:'Smoke screen',cost:20,cooldown:18,description:'12s concealment · reduces fire on both sides'},repair:{label:'Trench repair',cost:25,cooldown:15,description:'Restore 45 friendly cover · rally defenders'},strike:{label:'Artillery',cost:40,cooldown:25,description:'Strike enemy concentration · suppress survivors'}};
export type Action=keyof typeof actions;
export function support(b:Battle,key:Action){
 const a=actions[key];if(b.outcome||b.sp<a.cost||b.cooldowns[key]>0)return false;
 b.sp-=a.cost;b.cooldowns[key]=a.cooldown;const l=b.lanes[b.selected];
 if(key==='smoke')l.smoke=12;
 if(key==='repair'){l.cover[0]=Math.min(100,l.cover[0]+45);l.repair=3;for(const u of b.units)if(u.lane===b.selected&&u.side===0)u.morale=Math.min(100,u.morale+20);}
 if(key==='strike'){
 let x=780;let closest=1000;for(const u of b.units)if(u.side===1&&u.lane===b.selected&&u.x<closest){closest=u.x;x=u.x;}
 b.effects.push({x,lane:b.selected,offset:0,life:1,kind:'strike',dir:0});
 for(const u of b.units)if(u.lane===b.selected&&u.side===1&&Math.abs(u.x-x)<120){u.hp-=65;u.suppression=100;u.morale=Math.max(0,u.morale-40);}
 l.cover[1]=Math.max(0,l.cover[1]-18);
 }
 return true;
}
