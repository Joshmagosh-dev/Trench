export type Side = 0 | 1;
export interface Unit { id:number; side:Side; lane:number; x:number; offset:number; hp:number; morale:number; suppression:number; shot:number }
export interface Lane { front:number; cover:number[]; spawn:number[]; smoke:number; repair:number }
export interface Effect { x:number; lane:number; offset:number; life:number; kind:'shot'|'impact'|'strike'; dir:number }
export type Outcome = 'victory'|'defeat'|null;
export class Battle {
  time=0; sp=50; selected=0; units:Unit[]=[]; effects:Effect[]=[];
  lanes:Lane[]=Array.from({length:4},()=>({front:500,cover:[100,100],spawn:[0,0],smoke:0,repair:0}));
  losses=[0,0]; breaches=[0,0]; cooldowns={smoke:0,repair:0,strike:0}; outcome:Outcome=null; nextId=0;
  constructor(public seed=1945) {}
  random(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296;}
}
export const clamp=(n:number,min:number,max:number)=>Math.max(min,Math.min(max,n));
