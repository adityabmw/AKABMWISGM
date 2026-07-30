export function addVehicleTimeline(history=[],action){

history.push({

time:new Date().toISOString(),

action

});

return history;

}
