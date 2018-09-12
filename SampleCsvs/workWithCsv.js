// const fs = require('fs');

// var existenceOf = fs.exists("C:/Users/tireilly/GitHub/WOOPWOOPONE/SampleCsvs/20180910190100-OrderHeaderDetails.csv");
const orderHeaderCsv = "20180910190100-OrderHeaderDetails.csv";
const orderLineItemsCsv = "20180910190100-OrderLineItems.csv"

//var csv is the CSV file with headers
function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
}


var orderLineItemsContents = fs.readFileSync(orderLineItemsCsv, 'utf8');
var orderLineItems = csvJSON(orderLineItemsContents);

var orderHeaderContents = fs.readFileSync(orderHeaderCsv, 'utf8');
var orderHeader = csvJSON(orderHeaderContents);

function sweet(orderHeader, orderLineItems) {
    return orderHeader.map(function (orderHeader) {
        return { ponumber: orderHeader.ponumber, 
        orderLineItems: 
            orderLineItems.filter(function (orderLine) {
                return orderLine.ponumber == orderHeader.ponumber;
            })
        }; 
    })
}

let cheese = sweet(orderHeader, orderLineItems); 
cheese[1].orderLineItems; 

function beep() {
    var lists = [
        {
            "id": 5434364,
            "name": "New Releases"
        },
        {
            "id": 65456475,
            name: "Thrillers"
        }
    ],
        videos = [
            {
                "listId": 5434364,
                "id": 65432445,
                "title": "The Chamber"
            },
            {
                "listId": 5434364,
                "id": 675465,
                "title": "Fracture"
            },
            {
                "listId": 65456475,
                "id": 70111470,
                "title": "Die Hard"
            },
            {
                "listId": 65456475,
                "id": 654356453,
                "title": "Bad Boys"
            }
        ];

    return lists.map(function (list) {
        return {
            name: list.name,
            videos:
                videos.
                    filter(function (video) {
                        return video.listId === list.id;
                    }).
                    map(function (video) {
                        return { id: video.id, title: video.title };
                    })
        };
    });
}