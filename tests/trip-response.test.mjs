import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTripReply } from '../lib/trip-response.ts';
const reply={resp:'Your trip is ready',ui:'final',trip_plan:{destination:'Jaipur',hotels:[],itinerary:[{day:1,activities:[]}]}};
test('trip replies recover nested, fenced and wrapped JSON',()=>{
 for(const input of [reply,JSON.stringify(reply),{resp:JSON.stringify(reply)},'```json\n'+JSON.stringify(reply)+'\n```','Here is your trip:\n'+JSON.stringify(reply)]){
  assert.equal(parseTripReply(input).trip_plan.destination,'Jaipur');
  assert.equal(parseTripReply(input).ui,'final');
 }
});
test('incomplete JSON never displays raw trip data or a false final state',()=>{
 const parsed=parseTripReply('{"resp":"Ready","trip_plan":{');
 assert.equal(parsed.trip_plan,undefined);assert.equal(parsed.ui,'');assert.ok(!parsed.resp.startsWith('{'));
 assert.equal(parseTripReply({resp:'Where are you going?',ui:'budget'}).ui,'budget');
});
