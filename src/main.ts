import './style.css';
import { Battle } from './game/model';
import { GameLoop } from './game/loop';
import { Renderer } from './game/renderer';
import { step } from './game/simulation';
import { support, actions, Action } from './game/support';
import { UI } from './ui';
let battle=new Battle();let mode:'menu'|'playing'|'pause'|'report'='menu';let hudTimer=0;
function start(){battle=new Battle();mode='playing';ui.screen(mode,battle);ui.notify('Operation live. Reinforcements arrive automatically.');ui.update(battle,true);}
function pause(){if(mode!=='playing'&&mode!=='pause')return;mode=mode==='pause'?'playing':'pause';ui.screen(mode,battle);ui.update(battle,mode==='playing');}
function select(lane:number){battle.selected=lane;ui.update(battle,mode==='playing');}
function command(a:Action){if(mode!=='playing')return;if(support(battle,a))ui.notify(`${actions[a].label} authorized for lane ${battle.selected+1}.`);else ui.notify('Support unavailable: check SP and cooldown.');ui.update(battle,true);}
const ui=new UI(command,select,pause,start,()=>{mode='menu';ui.screen(mode,battle);ui.update(battle,false);});
const renderer=new Renderer(ui.canvas);ui.screen(mode,battle);ui.update(battle,false);
ui.canvas.addEventListener('pointerdown',e=>{const r=ui.canvas.getBoundingClientRect();select(Math.min(3,Math.max(0,Math.floor((e.clientY-r.top)/r.height*4))));});
window.addEventListener('keydown',e=>{if(e.repeat)return;const key=e.key.toLowerCase();if(key==='escape'){e.preventDefault();pause();}else if('1234'.includes(key)&&key.length===1)select(Number(key)-1);else if(key==='q')command('smoke');else if(key==='w')command('repair');else if(key==='e')command('strike');});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='playing')pause();});
new GameLoop(dt=>{if(mode==='playing'){step(battle,dt);if(battle.outcome){mode='report';ui.screen(mode,battle);ui.update(battle,false);}}hudTimer+=dt;if(hudTimer>.15){hudTimer=0;ui.update(battle,mode==='playing');}},()=>renderer.draw(battle));
