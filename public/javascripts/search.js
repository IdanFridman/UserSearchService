function handleClick() {
    var inputParam = document.querySelector("#myinput").value;
    $.get('http://localhost:3000/search?termToSearch=' + inputParam, function (responseText) {
        console.log(responseText);
        $("#resultlist").empty().append(prettyPrint(responseText));
    });

    return false;
}
