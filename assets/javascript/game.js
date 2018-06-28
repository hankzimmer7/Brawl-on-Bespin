// Create booleans to keep track of whether the player's character and enemy have been chosen, and if the game is over
var characterIsChosen = false;
var enemyIsChosen = false;
var difficultyIsChosen = false;
var difficulty = "normal";
var gameIsOver = false;

//Create arrays to store the characters, with the character being in a different array depending on if they are the player or an enemy
var characterChoices = [];
var chosenCharacter = [];
var remainingEnemies = [];
var defendingEnemy = [];

//Set up a new game
var setUpNewGame = function () {

    //Reset the booleans which keep track of whether a character and enemy have been selected, and if the game is over
    characterIsChosen = false;
    enemyIsChosen = false;
    difficultyIsChosen = false;
    difficulty = "normal";
    gameIsOver = false;

    //Clear the arrays of characters
    chosenCharacter.length = 0;
    remainingEnemies.length = 0;
    defendingEnemy.length = 0;

    // Remove any characters and titles which may be currently displayed on screen
    $("#game-area").empty();
    $("#choose-your-character-title").empty();
    $("#character-choice").empty();
    $("#your-character-title").empty();
    $("#chosen-character").empty();
    $("#enemy-to-fight-title").empty();
    $("#enemies").empty();
    $("#defending-enemy-title").empty();
    $("#defender").empty();
    $("#fight-button-location").empty();
    $("#battle-information").empty();
    $("#reset-button-location").empty();

    //Reset the character choices
    characterChoices = [{
            name: "yoda",
            displayName: "Yoda",
            hp: 70,
            baseAttack: 13,
            totalAttack: 0,
            counter: 15,
        },
        {
            name: "han_solo",
            displayName: "Han Solo",
            hp: 90,
            baseAttack: 11,
            totalAttack: 0,
            counter: 9,
        },
        {
            name: "general_grievous",
            displayName: "General Grievous",
            hp: 100,
            baseAttack: 10,
            totalAttack: 0,
            counter: 7,
        },
        {
            name: "boba_fett",
            displayName: "Boba Fett",
            hp: 110,
            baseAttack: 6,
            totalAttack: 0,
            counter: 11,
        }
    ]

    //Initially set the total attack equal to base attack. This is done so balancing can be done by changing only the base attack.
    characterChoices.forEach(function (element) {
        element.totalAttack = element.baseAttack;
    })


    //---Display the difficulty choice buttons-----

    //Generate a column to store all of the content
    var column = $("<div class='col'>");
    //Generate two rows: One for the instructions and one for the buttons
    var instructionsRow = $("<div class='row'>");
    var buttonsRow = $("<div class='row'>");
    //Generate the columns for the instructions and for the buttons
    var instructionsColumn = $("<div class='col'>");
    var buttonsColumn = $("<div class='col'>");

    //Generate the instructions
    instructionsColumn.append("<h3>Choose the Difficulty:</h3>");

    // Generate the buttons and button descriptions
    var normalButton = $("<button id='normal-button' type='button' class='btn btn-dark difficulty-button'>");
    normalButton.text("Normal");
    var easyButton = $("<button id='easy-button' type='button' class='btn btn-dark difficulty-button'>");
    easyButton.text("Easy");
    var normalDescription = $('<span>');
    normalDescription.text("Stats are hidden")
    var easyDescription = $('<span>');
    easyDescription.text("Stats are shown")

    //Append the content to the columns and rows
    buttonsColumn.append(normalButton, normalDescription, easyButton, easyDescription);
    instructionsRow.append(instructionsColumn);
    buttonsRow.append(buttonsColumn);
    column.append(instructionsRow, buttonsRow);

    //Append to the game area
    $('#game-area').append(column);

    //------------------------------------------------
}

//Generate a new character card to be displayed on screen
var newCharacterCard = function (characterArray, characterStatus) {

    //Declare a variable to store the color for the card;
    var bgColor = "bg-light";

    //Add the correct color to the character card depending on the status
    if (characterStatus === "availableChoice") {
        bgColor = "bg-light";
    } else if (characterStatus === "player") {
        bgColor = "bg-light";
    } else if (characterStatus === "remainingEnemy") {
        bgColor = "bg-danger text-light";
    } else if (characterStatus === "defendingEnemy") {
        bgColor = "bg-dark text-light";
    }

    //Create the new character card elements
    var newCharacterCard = $("<div class='col-sm-6 col-lg-3'>");
    var card = $("<div class='card " + characterStatus + " " + bgColor + "' id = " + characterArray.name + ">");
    var cardImage = $("<img class='card-img-top' src = 'assets/images/" + characterArray.name + ".jpg' alt = " + characterArray.displayName + ">");
    var cardBody = $("<div class='card-body'>");
    var cardTitle = $("<h5 class='card-title'>" + characterArray.displayName + "</h5>");
    var cardText = $("<p class='card-text'>HP: " + characterArray.hp + "</p>");

    //Append everything together onto the new character card
    cardBody.append(cardTitle, cardText);
    //If difficulty is set to easy, add the attack and counter stats
    if (difficulty === "easy") {
        cardBody.append("<p class='card-text'>Attack: " + characterArray.totalAttack + "</p>");
        cardBody.append("<p class='card-text'>Counter: " + characterArray.counter + "</p>");
    }
    card.append(cardImage, cardBody);
    newCharacterCard.append(card);

    return newCharacterCard;
}

//Start the game once the document is ready
$(document).ready(function () {

    //First, set up a new game
    setUpNewGame();

    //When the difficulty button is clicked
    $(document).on("click", '.difficulty-button', function () {

        // Determine which button was clicked
        var clickedButton = this.getAttribute("id");

        // Set the difficulty depending on the button clicked
        if (clickedButton === "normal-button") {
            difficulty = "normal";
            difficultyIsChosen = true;
        } else if (clickedButton === "easy-button") {
            difficulty = "easy";
            difficultyIsChosen = true;
        }

        $("#game-area").empty();

        //Display each of the character choices on screen
        $("#choose-your-character-title").append("<h3>Choose Your Character:</h3>")
        characterChoices.forEach(function (element) {
            $("#character-choice").append(newCharacterCard(element, "availableChoice"));

        })

        //Display the reset button
        $("#reset-button-location").append("<button id='reset-button' type='button' class='btn btn-dark'>Reset Game</button>")
        //Add the click target to the reset button
        $("#reset-button").attr('onclick', "location.href='index.html'")
    });

    //If the user clicks on one of the available character choices
    $(document).on('click', '.availableChoice', function () {

        //Only take action If a character has not yet been chosen
        if (characterIsChosen === false) {

            //Determine the index of the chosen character within the characterChoices array
            var chosenCharacterName = this.getAttribute("id");
            var characterIndex = characterChoices.map(function (e) {
                return e.name;
            }).indexOf(chosenCharacterName);

            // Move the chosen character into the chosenCharacter array and out of the characterChoices array
            chosenCharacter.push(characterChoices[characterIndex]);
            characterChoices.splice(characterIndex, 1);
            $("#chosen-character").append(newCharacterCard(chosenCharacter[0], "player"));

            // Move the non-chosen characters into the enemies array
            characterChoices.forEach(function (element) {
                remainingEnemies.push(element);
            })
            remainingEnemies.forEach(function (element) {
                $("#enemies").append(newCharacterCard(element, "remainingEnemy"));
            })

            // Clear the characterChoices array and remove the choices from the screen
            characterChoices.length = 0;
            $("#character-choice").empty();
            $("#choose-your-character-title").empty();

            //Display the title for your character and the instruction to choose an enemy to fight
            $("#your-character-title").append("<h3>Your Character:</h3>");
            $("#enemy-to-fight-title").append("<h3>Choose an Enemy to Fight:</h3>");

            characterIsChosen = true;
        }
    })

    //When the user clicks an enemy to attack
    $(document).on("click", '.remainingEnemy', function () {

        //If no enemy is currently chosen, take action
        if (enemyIsChosen === false) {

            //Determine the index of the chosen enemy within the remainingEnemies array
            var chosenEnemyName = this.getAttribute("id");
            var characterIndex = remainingEnemies.map(function (e) {
                return e.name;
            }).indexOf(chosenEnemyName);

            // Move the chosen enemy into the defendingEnemy array and out of the remainingEnemies array
            defendingEnemy.push(remainingEnemies[characterIndex]);
            remainingEnemies.splice(characterIndex, 1);
            $("#defender").append(newCharacterCard(defendingEnemy[0], "defendingEnemy"));

            // Remove the enemy choices from the screen
            $("#enemy-to-fight-title").empty();
            $("#enemies").empty();

            //add the fight button
            $("#fight-button-location").append("<button id='fight-button' type='button' class='btn btn-dark'>Fight!</button>");
            $("#defending-enemy-title").append("<h3>Defending Enemy:</h3>");

            enemyIsChosen = true;
        }
    });

    //When the fight button is clicked
    $(document).on("click", '#fight-button', function () {

        //Only take action if there is an enemy chosen
        if (enemyIsChosen === true) {

            //Display the battle information
            $("#battle-information").empty();
            var yourAttackInfo = $('<p>');
            var enemyCounterInfo = $('<p>');
            var attackIncreaseInfo = $('<p>');
            var yourAttackText = "You dealt " + chosenCharacter[0].totalAttack + " damage to " + defendingEnemy[0].displayName + ".";
            var enemyCounterText = defendingEnemy[0].displayName + " counter-attacked you for " + defendingEnemy[0].counter + " damage.";
            var attackIncreaseText = "Your attack increased to " + (chosenCharacter[0].totalAttack + chosenCharacter[0].baseAttack) + "."
            yourAttackInfo.text(yourAttackText);
            enemyCounterInfo.text(enemyCounterText);
            attackIncreaseInfo.text(attackIncreaseText)
            $("#battle-information").append(yourAttackInfo, enemyCounterInfo, attackIncreaseInfo);

            //Have characters damage each other
            defendingEnemy[0].hp -= chosenCharacter[0].totalAttack;
            chosenCharacter[0].hp -= defendingEnemy[0].counter;

            //Player's attack increases
            chosenCharacter[0].totalAttack += chosenCharacter[0].baseAttack;

            //Clear the currently displayed character card and update them with the new stats
            $("#defender").empty();
            $("#defender").append(newCharacterCard(defendingEnemy[0], "defendingEnemy"));
            $("#chosen-character").empty();
            $("#chosen-character").append(newCharacterCard(chosenCharacter[0], "player"));


            //If the player is defeated
            if (chosenCharacter[0].hp <= 0) {
                alert("You have been defeated!!")
                gameIsOver = true;
            }

            //If the defending enemy is defeated
            else if (defendingEnemy[0].hp <= 0) {
                //Clear the defender from the defendingEnemy array and from the screen
                $("#defending-enemy-title").empty();
                $("#defender").empty();
                $("#fight-button-location").empty();
                $("#battle-information").empty();
                defendingEnemy.length = 0;
                enemyIsChosen = false;

                //If there are any enemy choices still remaining
                if (remainingEnemies.length > 0) {

                    //Add the title with the instruction to choose an enemy
                    $("#enemy-to-fight-title").append("<h3>Choose an Enemy to Fight:</h3>");

                    //Display the remaining enemies
                    remainingEnemies.forEach(function (element) {
                        $("#enemies").append(newCharacterCard(element, "remainingEnemy"));
                    })
                }

                //If there are no enemies remaining, the player wins
                else {
                    alert("You have defeated all of the enemies! Well done!")
                    gameIsOver = true;
                }
            }

            //If the game is over, set up a new game
            if (gameIsOver === true) {
                setUpNewGame();
            }
        }
    });

    //Show what is happening in the console log
    $(document).on("click", function () {
        console.log("Is character chosen? " + characterIsChosen);
        console.log("Is an enemy chosen? " + enemyIsChosen);
        console.log("Character Choices:");
        console.log(characterChoices);
        console.log("Character Chosen:");
        console.log(chosenCharacter);
        console.log("Enemies Remaining: ");
        console.log(remainingEnemies);
        console.log("-------------------------");
    })
});