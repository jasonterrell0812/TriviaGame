// A $( document ).ready() block.
$(document).ready(function() {
    console.log("ready!");

var allQuestions = [
	{
    question: "In 1772, this fur trader from Haiti is recognized as the city's founder",
    choices: ["Jean-Baptiste Pointe du Sable", "Henry Dearborn", "William B. Ogden"],
    correctAnswer: 0
  },

  {
    question: "This person was elected the city's first mayor",
    choices: ["George Ferris", "William B. Ogden", "Marshall Field"],
    correctAnswer: 1
  },

  {
    question: "In 1851, this was the first university founded in the Chicago area",
    choices: ["University of Chicago", "DePaul University", "Northwestern University", "Loyola University"],
    correctAnswer: 2
  },

  {
    question: "In 1871, this event destroyed 3.5 square miles of the city",
    choices: ["The Great Chicago Fire", "Eastland Disaster", "Chicago Cubs world series victory party", "Des Plaines Tornado"],
    correctAnswer: 0
  },

  {
    question: "This man was shot by the FBI in the alley next to the Biograph Theater",
    choices: ["Al Capone", "John Dillinger", "Jesse James"],
    correctAnswer: 1
  },
  
  
];
var currentquestion = 0;
var correctAnswers = 0;

function setupOptions() {
  $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
  var options = allQuestions[currentquestion].choices;
  var formHtml = '';
  for (var i = 0; i < options.length; i++) {
    formHtml += '<div><input type="radio" name="option" value="' + i + '" id="option' + i + '"><label for="option' + i + '">' +
      allQuestions[currentquestion].choices[i] + '</label></div><br/>';
  }
  $('#form').html(formHtml);
  $("#option0").prop('checked', true);
};

function checkAns() {
  if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
    correctAnswers++;
  };
};

$(document).ready(function() {

  $(".jumbotron").hide();
  $('#start').click(function() {
    $(".jumbotron").fadeIn();
    $(this).hide();
  });

  $(function() {
    $("#progressbar").progressbar({
      max: allQuestions.length - 1,
      value: 0
    });
  });

// supposed to start a time, doesn't
function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function() {
       return timeRemaining - ( Date.now() - startTime );
    }
}

// creating a coundown, at stage start
var currentCountDown = createCountDown(30000); // 30 seconds countdown

//... during the game, just use with :
var countDownValue = currentCountDown();     // in ms


$('.timer').append(currentCountDown);


  setupOptions();

  $("#next").click(function() {
    event.preventDefault();
    checkAns();
    currentquestion++;
    $(function() {
      $("#progressbar").progressbar({
        value: currentquestion
      });
    });
    if (currentquestion < allQuestions.length) {
      setupOptions();
      if (currentquestion == allQuestions.length - 1) {
        $('#next').html("Submit");
        $('#next').click(function() {
          $(".jumbotron").hide();
          $("#result").html("You correctly answered " + correctAnswers + " out of " + currentquestion + " questions! ").hide();
          $("#result").fadeIn(1500);
        });

      };

    };
  });
});



});