import { Battle, Unit } from './model';
export const trenchX=(side:number)=>side===0?220:780;
export function inCover(u:Unit){return Math.abs(u.x-trenchX(u.side))<38;}
export function protection(b:Battle,u:Unit){return inCover(u)?0.65*b.lanes[u.lane].cover[u.side]/100:0;}
