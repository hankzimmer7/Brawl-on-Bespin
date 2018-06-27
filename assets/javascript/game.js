//Create an array to store objects of each of the characters and their stats
var characters = [{
        name: "Yoda",
        nameNoSpaces: "yoda",
        hp: 70,
        attack: 5,
        counter: 20,
    },
    {
        name: "Han Solo",
        nameNoSpaces: "han_solo",
        hp: 90,
        attack: 12,
        counter: 8,
    },
    {
        name: "General Grievous",
        nameNoSpaces: "general_grievous",
        hp: 130,
        attack: 7,
        counter: 7,
    },
    {
        name: "Boba Fett",
        nameNoSpaces: "boba_fett",
        hp: 100,
        attack: 10,
        counter: 9,
    }
]

var chosenCharacter;

var setUpNewGame = function () {
    for (var i = 0; i < characters.length; i++) {
        var newCharacterCard =
            "<div class='col-sm-6 col-lg-3'>" +
            "<div class='card' id = " + characters[i].nameNoSpaces + ">" +
            "<img class='card-img-top' src = 'assets/images/" + characters[i].nameNoSpaces + ".jpg' alt = " + characters[i].name + ">" +
            "<div class='card-body'>" +
            "<h5 class='card-title'>" + characters[i].name + "</h5>" +
            "<p class='card-text'>HP: " + characters[i].hp + "</p>" +
            "<p class='card-text'>Attack: " + characters[i].attack + "</p>" +
            "<p class='card-text'>Counter: " + characters[i].counter + "</p>" +
            "</div>" +
            "</div>" +
            "</div>"
        $("#character-choice").append(newCharacterCard);
    }
}

var newCharacterCard = function (input) {
    var i = input;
    var newCharacterCard =
        "<div class='col-sm-6 col-lg-3'>" +
        "<div class='card' id = " + characters[i].nameNoSpaces + ">" +
        "<img class='card-img-top' src = 'assets/images/" + characters[i].nameNoSpaces + ".jpg' alt = " + characters[i].name + ">" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" + characters[i].name + "</h5>" +
        "<p class='card-text'>HP: " + characters[i].hp + "</p>" +
        "<p class='card-text'>Attack: " + characters[i].attack + "</p>" +
        "<p class='card-text'>Counter: " + characters[i].counter + "</p>" +
        "</div>" +
        "</div>" +
        "</div>"
    return newCharacterCard;
    // $("#chosen-character").append(newCharacterCard);
}

$(document).ready(function () {
    setUpNewGame();

    $(".card").on("click", function () {
        chosenCharacter = this.getAttribute("id");
        console.log(this)
        console.log(this.getAttribute("id"))
        alert("You chose " + chosenCharacter);
        $("#chosen-character").append(newCharacterCard(0));
    });
});