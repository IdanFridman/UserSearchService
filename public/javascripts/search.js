function doGlobalSearch(inputParam) {
    $.get('http://localhost:3000/search?termToSearch=' + inputParam, function (responseText) {
        console.log(responseText);
        $("#resultlist").empty().append(prettyPrint(responseText));
    });

    return false;
}

var ws = new WebSocket('ws://localhost:3000', 'echo-protocol');

function sendMessage(message) {
    console.log("sending msg=" + message);
    ws.send(message);
    return false;
}

function searchMessageByEmail(inputParam) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/search",
        data: {termToSearch: inputParam, fieldToSearch: "email"}
    }).done(function (responseText) {
        console.log(responseText);
        $("#resultlist").empty().append(prettyPrint(responseText));
    });
    return false;
}


function generateInterest() {

    var textArray = [
        'swimming',
        'running',
        'playing',
        'singing',
        'dancing'
    ];

    var randomIndex = Math.floor(Math.random()*textArray.length);
    return textArray[randomIndex];

}
function generateAge() {
    return Math.floor(Math.random() * 50) + 1;
}
function createDoc() {

    var obj = new Object();
    obj.first_name = "Roi";
    obj.last_name = "Fridman";
    obj.age = generateAge();
    obj.Background = "I like to play a guitar";
    obj.interests = generateInterest();
    obj.date = "2014-09-24";
    obj.email = "Roi@use.com";
    obj.location = [generateRandomLong(), generateRandomLat()];

    var jsonString = JSON.stringify(obj);
    return jsonString;
}
function indexDoc(numOfdocs) {

    for (i = 0; i < numOfdocs; i++) {

        setTimeout(function () {
            var doc = createDoc();
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/index",
                data: {termToIndex: doc}
            }).done(function (responseText) {
                console.log(responseText);
                // $("#resultlist").empty().append(prettyPrint(responseText));
            });

        }, 5000);
    }
    return false;

}

ws.addEventListener("message", function (e) {
    // The data is simply the message that we're sending back
    var msg = e.data;

    // Append the message
    document.getElementById('chatlog').innerHTML += '<br>' + msg;
});


$(document).ready(function () {
    //$('#searchText')

    $('#globalSearchBtn').on('click', function () {
        var query = $("#searchText").val();

        doGlobalSearch(query);
    });
    $('#emailSearchBtn').on('click', function () {
        var query = $("#searchText").val();
        searchMessageByEmail(query);
    });
    $('#indexBtn').on('click', function () {
        var query = $("#searchText").val();
        indexDoc(40);

    });
});

// LONGITUDE -180 to + 180
function generateRandomLong() {
    var num = (Math.random() * 180).toFixed(3);
    var posorneg = Math.floor(Math.random());
    if (posorneg == 0) {
        num = num * -1;
    }
    return num;
}
// LATITUDE -90 to +90
function generateRandomLat() {
    var num = (Math.random() * 90).toFixed(3);
    var posorneg = Math.floor(Math.random());
    if (posorneg == 0) {
        num = num * -1;
    }
    return num;
}

