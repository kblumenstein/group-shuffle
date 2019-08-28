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
        $("#pair").hide();
        $("#reset").hide();
    } else {
        html += "<ul>";
        $.each(groups, function () {
            html += "<li id='" + number + "'>" +	this + "</li>";
            number++;
        });

        html += "</ul>";
        if(groups.length === 1){
            $("#shuffle").hide();
            $("#pair").hide();
        } else{
            $("#shuffle").show();
            $("#pair").show();
        }
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

function pair(array) {
    "use strict";

    var groupsHtml = "<ul>", i, secondNumber;

    array.sort(function() { return 0.5 - Math.random(); }); // shuffle arrays

    var length;

    if(array.length % 2 != 0){
        length = (array.length - 1) / 2; 
    }else{
        length =  array.length / 2;
    }
    console.log(array);
    
    for (let index = 0; index < length - 1; index++) {
        const element = array[index];
        groupsHtml += "<li>" + array[index] + " => " + array[index + length] + "</li>";
    }

    groupsHtml += "<li>" + array[length - 1] + " => " + array[(length - 1) + length];

    if(array.length % 2 != 0){
        groupsHtml += " & " + array[(length - 1) + length + 1];
    }

    groupsHtml += "</li>";

    $("#groupJoin").html(groupsHtml);
    $("#joinGroups").show();
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

$("#pair").click(function () {
    "use strict";
    var length, random;
    
    if (groups.length <= 1) {
        alert("Please add more than one group!");
    } else {
        pair(groups);
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