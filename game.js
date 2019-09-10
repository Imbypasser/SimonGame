// An array to hold the sequence
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


//Detecting a key pressed to start a game
$(document).keydown(function(event) {
  //If game has not started after a key is press, make the game start and activate the next sequence.
  if (!started && event.code === "Space") {
    nextSequence();
    started = true;
  }
});

//Detecting a key pressed to start a game
$(document).click(function(event) {
  //If game has not started after a key is press, make the game start and activate the next sequence.
  if (!started) {
    nextSequence();
    started = true;
  }
});


//This function detects user click on the button
//Using event listener to capture which button is been click by storing the id
$(".btn").on("click", function() {
  if(start === true){
    var userChosenColour = $(this).attr("id");
    //Adding the color into an array to store the pattern
    userClickedPattern.push(userChosenColour);

    //Adding sounds
    playSound(userChosenColour);

    //Adding animation
    animatePress(userChosenColour);

    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
  }

});


//Check answer against the the two array created, userClickedPattern and gamePattern;
//Specifically check the last index of userClickedPattern with gamePattern[userClickedPattern last index]
function checkAnswer(currentLevel) {
  //currentLevel = userClickedPattern last index
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1200);
    }
  }
  //When the user failed to guess correctly, we add an effect that indicate a failure and change the H1 text to a try again message.
  else {
    console.log("fail");
    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass("game-over");
      },
      200);

    $("h1").text("Game Over, Press Space to Restart");
    startOver();
  }
}

//This function resets the state of the game.
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}


//Take note that this function will only execute whenever the length of the userClickedPattern and gamePattern is the same
//Which only happens when user click on the button to add the pattern into userClickedPattern.
//gamePattern will always have one color push into the array, because when we click a key on our keyboard we activate the eventListner that
//is waiting for a key to be pressed and start the game by executing this nextSequence() once.
function nextSequence() {

  //Clear the array so that we can recheck the sequence with the exisiting gamePattern array.
  userClickedPattern = [];

  //Increment the Level
  level++;
  switch (level) {
    case 1:
      $("#level-title").text("Level " + level + " - Warm up");
      break;
    case 2:
      $("#level-title").text("Level " + level + " - Still Easy");
      break;
    case 3:
      $("#level-title").text("Level " + level + " - Keep Going!");
      break;
    case 4:
      $("#level-title").text("Level " + level + " - Not bad!");
      break;
    case 5:
      $("#level-title").text("Level " + level + " - Getting Harder!");
      break;
    case 6:
      $("#level-title").text("Level " + level + " - And Harder!!");
      break;

    case 7:
      $("#level-title").text("Level " + level + " - Wow!!");
      break;

    case 8:
      $("#level-title").text("Level " + level + " - Impressive!!");
      break;

    case 9:
      $("#level-title").text("Level " + level + " - Wait.. you're ?!!");
      break;

    default:
      $("#level-title").text("Level " + level + " - You're Sheldon Cooper!!");
  }


  // Generate a number from 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Generate random color base on the random number indexing.
  var randomChosenColour = buttonColours[randomNumber];

  //Adding the randomChosenColour into the gamePattern array.
  gamePattern.push(randomChosenColour);

  //Getting the ID of the selected color button and add animation.
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //Also attach a sound to it also.
  playSound(randomChosenColour);

}



// Make sound base on the name of the button
function playSound(name) {
  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();
}

// Adding animation function
function animatePress(currentColour) {
  var button = $("#" + currentColour);

  //Adding the class .pressed
  button.addClass("pressed");

  //Setting a timer before the class .pressed is removed.
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
}
