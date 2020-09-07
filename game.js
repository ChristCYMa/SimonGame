let buttonColours = ["red","blue","green", "yellow"];
let randomChosenColour;
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 0;


$(document).on("keydown",function(){
  if (gameStart === false){
    newSequence();
    gameStart= true;
  }
  else{
    console.log("game has already started");
  }
});


$(".btn").on("click", function(event){
  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){

  console.log("success");
  if (userClickedPattern.length===gamePattern.length) {
    setTimeout(newSequence, 1000);
  }
}
else {
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
    console.log("fail");
    $(document).on("keydown", startOver());
}
}


function newSequence(){
  let randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
  userClickedPattern=[];
  return randomChosenColour;
}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  gameStart=false;
}
