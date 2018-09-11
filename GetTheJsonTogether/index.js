const azure = require('azure-storage'); 
const fs = require('fs') ;

module.exports = async function (context, myQueueItem) {
    context.log(process.version); 
    context.log(process.env["QueueConnectionString"]); 
    const blobService = azure.createBlobService(process.env["QueueConnectionString"]); 
    
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    
    myQueueItem.forEach(x => context.log("Check it:" + x.content)); 

    const myStuff = myQueueItem.forEach(x => x.content.split("/")); 
    context.log(myStuff); 

    var ourBlobs = myQueueItem.forEach(x => blobService.getBlobToText(x)); 
//     blobService.getBlobToText()
};