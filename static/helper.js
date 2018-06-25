function appendIncoming(name)
{
    var plTab = document.createElement("div");
    plTab.className = "avPl";
    plTab.id = name;
    plTab.innerHTML = name;
    document.getElementById("loginBox").appendChild(plTab);
}

function changeStatus(name)
{
    var plTab = document.getElementById(name);
    plTab.className = "unPl";
}