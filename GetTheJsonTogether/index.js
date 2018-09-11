module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    //const cheese = JSON.parse(myQueueItem); 
    myQueueItem.forEach(x => context.log("Check it:" + x.content)); 
};