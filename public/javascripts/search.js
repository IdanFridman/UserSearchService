function handleClick() {
    var inputParam = document.querySelector("#myinput").value;
    $.get('http://localhost:3000/search?termToSearch=' + inputParam, function (responseText) {
        console.log(responseText);
        $("#resultlist").empty().append(prettyPrint(responseText));
    });

    return false;
}

var ws = new WebSocket('ws://localhost:3000', 'echo-protocol');

function sendMessage() {
    var message = document.getElementById('message').value;
    console.log("sending msg=" + message);
    ws.send(message);
    return false;
}

ws.addEventListener("message", function(e) {
    // The data is simply the message that we're sending back
    var msg = e.data;

    // Append the message
    document.getElementById('chatlog').innerHTML += '<br>' + msg;
});

