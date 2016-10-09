/*jslint browser: true, devel: true, forin: true, plusplus: true*/

/*global $, jQuery, alert*/

/****
*
* Variables
*
*****/
                
var groups = [1, 2, 3, 4, 5, 6];

/****
*
* Functions
*
*****/

function refreshList() {
    "use strict";
    var html = "", number = 0;
    if (groups.length === 0) {
        html += "<p>Pleade add groupnames!</p>";
        $("#shuffle").hide();
        $("#reset").hide();
    } else {
        html += "<ul>";
        $.each(groups, function () {
            html += "<li id='" + number + "'>" +	this + "</li>";
            number++;
        });

        html += "</ul>";
        
        $("#shuffle").show();
        $("#reset").show();
    }
    $("#groups").html(html);
}

function show(random) {
    "use strict";
    var groupsHtml = "<ul>", i, secondNumber;
    
    for (i = 0; i < groups.length; i++) {
        secondNumber = i + random;
        if (secondNumber >= groups.length) {
            secondNumber = (secondNumber - groups.length);
        }
        
        groupsHtml += "<li>" + groups[i] + " => " + groups[secondNumber] + "</li>";
    }
    
    groupsHtml += "</ul>";
    $("#groupJoin").html(groupsHtml);
    $("#joinGroups").show();
}

function shuffle(array) {
    "use strict";
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/****
*
* On Klick
*
*****/

$("#add").click(function () {
    "use strict";
    var gname = $("#groupname").val();
    if (gname.trim()) {
        groups.push(gname);
        refreshList();
        $("#groupname").val("");
    }
});

$("#shuffle").click(function () {
    "use strict";
    var length, random;
    
    if (groups.length <= 2) {
        alert("Please add more than two groups!");
    } else {
        shuffle(groups);
        length = groups.length - 1;
        random = 0;
        while (random === 0) {
            random = Math.floor(Math.random() * length);
        }
        show(random);
    }
});

$("#reset").click(function () {
    "use strict";
    groups = [];
    refreshList();
});




/****
*
* Inital Loading
*
*****/

refreshList();