import { Battle } from './model';
export const DURATION=180;
export function checkMission(b:Battle){if(b.breaches[1]>=3)b.outcome='defeat';else if(b.breaches[0]>=3)b.outcome='victory';else if(b.time>=DURATION)b.outcome=b.breaches[0]>=b.breaches[1]?'victory':'defeat';}
