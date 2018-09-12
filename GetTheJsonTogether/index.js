const azure = require('azure-storage');
const fs = require('fs');

module.exports = async function (context, myQueueItem) {
    context.log(process.version);
    context.log(process.env["QueueConnectionString"]);
    const blobService = azure.createBlobService(process.env["BlobConnectionString"]);

    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    myQueueItem.forEach(x => context.log("Check it:" + x.content));

    const myStuff = myQueueItem.forEach(x => x.content.split("/"));
    const m = myQueueItem.map(function (x) { return x.content.split("/") });


    m.forEach(x => 
        blobService.getBlobToText(
            x[1],
            x[2],
            function(err, blobContent, blob) {
                if(err) {
                    context.log("couldnt download: ", x[1], x[2]); 
                    context.log("POOOOOP");
                    context.log(err); 

                } else {
                    context.log(blobContent); 
                }
            }
        )
    )

    

    // var ourBlobs = myQueueItem.forEach(x => blobService.getBlobToText(x)); 
    //     blobService.getBlobToText()
};
