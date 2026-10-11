import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Battle } from '../src/game/model';
import { step } from '../src/game/simulation';
import { support } from '../src/game/support';
import { checkMission } from '../src/game/mission';
import { protection } from '../src/game/cover';

test('fixed seed produces identical battles and bounded autonomous units',()=>{
 const a=new Battle(42),b=new Battle(42);
 for(let i=0;i<5401;i++){step(a,1/30);step(b,1/30);}
 assert.deepEqual(a,b);assert.ok(a.outcome);assert.ok(a.losses[0]+a.losses[1]>0);assert.ok(a.units.length<=80);
 for(const u of a.units){assert.ok(u.morale>=0&&u.morale<=100);assert.ok(u.suppression>=0&&u.suppression<=100);}
});
test('support costs, cooldowns, recovery and lane targeting',()=>{
 const b=new Battle();b.selected=2;b.lanes[2].cover[0]=20;
 assert.ok(support(b,'repair'));assert.equal(b.sp,25);assert.equal(b.lanes[2].cover[0],65);assert.equal(b.lanes[0].cover[0],100);
 assert.equal(support(b,'repair'),false);assert.equal(b.sp,25);
 assert.ok(support(b,'smoke'));assert.equal(b.lanes[2].smoke,12);assert.equal(support(b,'strike'),false);
 for(let i=0;i<600;i++)step(b,1/30);
 assert.equal(b.cooldowns.repair,0);assert.equal(b.lanes[2].smoke,0);assert.ok(b.sp>50);
});
test('cover reduces incoming damage only in a trench',()=>{
 const b=new Battle();step(b,1/30);const u=b.units[0];u.x=220;assert.equal(protection(b,u),.65);u.x=400;assert.equal(protection(b,u),0);u.x=220;b.lanes[0].cover[0]=0;assert.equal(protection(b,u),0);
});
test('breakthroughs and deadline resolve win and loss; ended battle freezes',()=>{
 const win=new Battle();win.breaches[0]=3;checkMission(win);assert.equal(win.outcome,'victory');step(win,1);assert.equal(win.time,0);
 const loss=new Battle();loss.breaches[1]=3;checkMission(loss);assert.equal(loss.outcome,'defeat');
 const timeout=new Battle();timeout.time=180;timeout.breaches=[0,1];checkMission(timeout);assert.equal(timeout.outcome,'defeat');
});
test('artillery damages only enemy infantry in selected lane',()=>{
 const b=new Battle();step(b,1/30);b.sp=100;const enemy=b.units.find(u=>u.side===1&&u.lane===0)!;const friend=b.units.find(u=>u.side===0&&u.lane===0)!;
 assert.ok(support(b,'strike'));assert.equal(enemy.hp,35);assert.equal(enemy.suppression,100);assert.equal(friend.hp,100);assert.ok(b.effects.some(e=>e.kind==='strike'));
});
