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

function searchMessageByEmail() {
    var message = document.getElementById('email_id').value;
    console.log("sending message=" + message);
    /*$.get('http://localhost:3000/search?termToSearch=' + message + '&fieldToSearch=email', function (responseText) {
        console.log(responseText);
        $("#resultlist").empty().append(prettyPrint(responseText));
    });*/
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/search",
        data: { termToSearch: message, fieldToSearch: "email" }
    });
    return false;
}

ws.addEventListener("message", function (e) {
    // The data is simply the message that we're sending back
    var msg = e.data;

    // Append the message
    document.getElementById('chatlog').innerHTML += '<br>' + msg;
});


$(document).ready(function(){
    //$('#searchText')

    $('#globalSearchBtn').on('click', function(){
        var query = $("#searchText").val();

        doGlobalSearch(query);
    });
    $('#emailSearchBtn').on('click', function(){
        var query = $("#searchText").val();

        searchMessageByEmail(query);
    });
});

