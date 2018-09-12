const fs = require('fs');

// console.log(fs);
print = console.log;
var existenceOf = fs.exists("C:/Users/tireilly/GitHub/WOOPWOOPONE/SampleCsvs/20180910190100-OrderHeaderDetails.csv");

fs.exists("")
print(existenceOf);

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

const fileName = "20180910190100-OrderHeaderDetails.csv"

const getContents = new Promise((res, rej) => {
    fs.readFile(fileName)
        .done(stuff => console.log(stuff))
        .fail(err => console.log(err));
});



function getStuff(file) {
    return Promise(function (resolve, reject) {
        if (typeof file != "string") {
            return reject(new TypeError("inputs must be a string"));
        }
        return resolve(fs.readFile(file));
    });
}


var myPromise = getStuff(fileName);

myPromise.then(function (result) {
    console.log("result");
}).catch(function (err) {
    console.error(err);
})

var fileContent = fs.readFileSync(fileName, 'utf8');