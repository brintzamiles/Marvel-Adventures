//Declare and initialize global variables
var damage;
var status;
var Defender = false;
var Attacker = true;
var loss = true;

var arrayAvailCharacters = [{
    name: "incredible-hulk",
    hp: 0,
    damage: 0
}, {
    name: "black-panther",
    hp: 0,
    damage: 0
}, {
    name: "iron-man",
    hp: 0,
    damage: 0
}, {
    name: "capt-america",
    hp: 0,
    damage: 0
}];
var selectedDefender;
var selectedCharacter;

$(document).ready(function () {
    $("#incredible-hulk").on("click", function () {
        setAttacker(this);
        setDefender(this);
    });

    $("#black-panther").on("click", function () {
        setAttacker(this);
        setDefender(this);
    });

    $("#iron-man").on("click", function () {
        setAttacker(this);
        setDefender(this);
    });

    $("#capt-america").on("click", function () {
        setAttacker(this);
        setDefender(this);
    });

    $("#attack").on("click", function () {
        //
        if (!Attacker && !Defender && loss) {
            attack();
        }
    });

    $("#restart").on("click", function () {
        for (var i = 0; i < arrayAvailCharacters.length; i++) {
            $("#" + arrayAvailCharacters[i].name).attr("style", "border-color: none");
            $("#" + arrayAvailCharacters[i].name).appendTo("#availablePlayers");
        }
        Attacker = true;
        Defender = false;
        loss = true;

        status = 0;
        $("#availableCharacters").show();
        $("#messageDisplay").text("");
        $("#restart").hide();
        setDamageHP();

    });

});

function setDamageHP() {
    for (var i = 0; i < arrayAvailCharacters.length; i++) {
        arrayAvailCharacters[i].damage = Math.round((Math.random() + 1) * 10);
        arrayAvailCharacters[i].hp = Math.round((Math.random() + 1) * 110);
        $("#" + arrayAvailCharacters[i].name).find("#hp").text(arrayAvailCharacters[i].hp);
    }
}

setDamageHP();

function setAttacker(event) {
    if (Attacker) {
        //set attacker flag to false
        Attacker = false;
        //hide the available characters div
        $("#availableCharacters").hide();
        //set defender flag to true    

        Defender = true;
        for (var i = 0; i < arrayAvailCharacters.length; i++) {
            if (arrayAvailCharacters[i].name == event.id) {
                selectedCharacter = arrayAvailCharacters[i];
                damage = selectedCharacter.damage;
                $("#" + event.id).appendTo("#selectedPlayer");
            } else {
                $("#" + arrayAvailCharacters[i].name).appendTo("#enemiesAvailable");
            }
        }
    }
}

function setDefender(event) {

    if (!Attacker && Defender && selectedCharacter.name != event.id) {
        Defender = false;
        for (var i = 0; i < arrayAvailCharacters.length; i++) {
            if (arrayAvailCharacters[i].name == event.id) {
                selectedDefender = arrayAvailCharacters[i];
                $("#" + event.id).appendTo("#Defender");
            }
        }
    }
}

function getNewHP() {
    //calculate defender hp
    selectedDefender.hp = selectedDefender.hp - selectedCharacter.damage;
    $("#" + selectedDefender.name).find("#hp").text(selectedDefender.hp);


    //calculate attacker hp
    $("#" + selectedCharacter.name).find("#hp").text(selectedCharacter.hp);
    selectedCharacter.hp = selectedCharacter.hp - selectedDefender.damage;

    //calculate the damage of the selected character
    selectedCharacter.damage = selectedCharacter.damage + damage;
}


function changeMessageDisplay() {
    if (selectedCharacter.hp > 0 && selectedDefender.hp > 0) {
        $("#messageDisplay").text("You attacked " + selectedDefender.name + " with " + (selectedCharacter.damage - damage) + " damage.  ");
        $("#messageDisplay").append("<p>" + selectedDefender.name + " attacked you back with " + selectedDefender.damage + ".</p>");

    } else if (selectedCharacter.hp <= 0) {
        console.log("you lose!!");
        $("#messageDisplay").html("<p> Game Over:  You've been defeated by " + selectedDefender.name + " </p>");
        loss = false;
        $("#restart").show();

    } else if (selectedDefender.hp <= 0) {
        status++;
        $("#" + selectedDefender.name).hide();

        $("#messageDisplay").html("<p> " + selectedCharacter.name + " Wins! </p>");
        if (status < 3) {
            $("#messageDisplay").append("<p> Please select another enemy!</p>");
        } else {
            setDamageHP();
            $("#restart").show();
        }
        Defender = true;

    }
}

function attack() {
    getNewHP();
    changeMessageDisplay();


}