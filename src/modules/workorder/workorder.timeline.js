export function addTimeline(list=[],status){
list.push({
status,
time:new Date().toISOString()
});
return list;
}
