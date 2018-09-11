# QueueTrigger - JavaScript

Azure Functions V2

The `QueueTrigger` makes it incredibly easy to react to new Queues inside of Azure Queue Storage. This sample demonstrates a simple use case of processing data from a given Queue using C#.

## How it works

For a `QueueTrigger` to work, you provide a path which dictates where the queue messages are located inside your container.

## Learn more

To add a setting: 
`> func settings add QueueConnectionString`
`> Enter Value`

It will add it to local.settings.json

Also, see function.json to see how that QueueConnectionString is passed to function. 


Sample local.settings.json:

'''json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "QueueConnectionString": "DefaultEndpointsProtocol=https;AccountName=woopwoopstorage;AccountKey=g0ba6f1epnYOURSECRETCONNECTIONSTRING+I5AKVLajjLmL9bF6osiCNo260AGNNTsbljsmXOkBT3Ww==;EndpointSuffix=core.windows.net"
  },
  "ConnectionStrings": {}
}
'''