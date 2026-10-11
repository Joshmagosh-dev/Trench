import { clamp, Unit } from './model';
import { inCover } from './cover';
export function updateMorale(u:Unit,dt:number){u.suppression=Math.max(0,u.suppression-dt*10);u.morale=clamp(u.morale+dt*(u.suppression>25?-4:inCover(u)?8:2),0,100);}
