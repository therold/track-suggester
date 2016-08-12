var first_name;
var last_name;
$(document).ready(function() {
  $("input[type=radio]").on("select change", function(event) {
    if (checkForName()) {
     if ($("div.active").index() === 4) {
        $("form#user-input").submit();
      } else {
        $("#carousel").carousel("next");
      }
    }
    event.preventDefault();
  });

  $("input#first_name").on("blur", function(event) {
    firstName = $("#first_name").val();
    if (firstName) {
      $(".first_name_errorhint").text("");
      $(".first_name").removeClass("has-error");
    }
  });

  $("input#last_name").on("blur", function(event) {
    lastName = $("#last_name").val();
    if (lastName) {
      $(".last_name_errorhint").text("");
      $(".last_name").removeClass("has-error");
    }
  });

  $("form#user-input").submit(function(event){
      /* Get values from user responses. */
      var firstAnswer = parseInt($("input:radio[name=question1]:checked").val());
      var secondAnswer = parseInt($("input:radio[name=question2]:checked").val());
      var thirdAnswer = parseInt($("input:radio[name=question3]:checked").val());
      var fourthAnswer = parseInt($("input:radio[name=question4]:checked").val());
      var fifthAnswer = parseInt($("input:radio[name=question5]:checked").val());

      /* We're going to assign an int variable to each epicodus track. Then we'll weigh the answers from the user. Some responses are worth more than others.
      At the end we'll determine which track received the highest score, and display that result */
      var rubyRails = 0;
      var phpDrupal = 0;
      var javaAndroid = 0;
      var cssDesign = 0;
      var csharpDotnet = 0;

      /* Weighing responses from first question */
      if (firstAnswer === 1) {
        rubyRails += 5;
        phpDrupal += 5;
        cssDesign += 5;
        javaAndroid += -5
      } else if (firstAnswer === 2) {
        rubyRails += 2;
        phpDrupal += 2;
        cssDesign += 2;
        javaAndroid += -2
      } else if (firstAnswer === 3) {
        rubyRails += -2;
        phpDrupal += -2;
        cssDesign += -2;
        javaAndroid += 2
      } else if (firstAnswer === 4) {
        rubyRails += -5;
        phpDrupal += -5;
        cssDesign += -5;
        javaAndroid += 5
      }

      /* Weighing responses from second question */
      if (secondAnswer === 1) {
        javaAndroid += 5;
        csharpDotnet += 10;
        rubyRails += -5;
      } else if (secondAnswer === 2) {
        javaAndroid += 2;
        csharpDotnet += 5;
        rubyRails += -2;
      } else if (secondAnswer === 3) {
        csharpDotnet += -5;
        rubyRails += -2;
      } else if (secondAnswer === 4) {
        csharpDotnet += -5;
        rubyRails += -10;
      }

      /* Weighing responses from third question */
      if (thirdAnswer === 1) {
        cssDesign += 15;
      } else if (thirdAnswer === 2) {
        cssDesign += 2;
      } else if (thirdAnswer === 3) {
        cssDesign += -2
      } else if (thirdAnswer === 4) {
        cssDesign += -15;
      }

      /* Weighing responses from fourth question */
      if (fourthAnswer === 1) {
        rubyRails += 10;
        csharpDotnet += -3;
      } else if (fourthAnswer === 2) {
        rubyRails += 2;
      } else if (fourthAnswer === 3) {
        rubyRails += -1
      } else if (fourthAnswer === 4) {
        rubyRails += -10;
        csharpDotnet += 3;
      }

      /* Weighing responses from fifth question */
      if (fifthAnswer === 1) {
        phpDrupal += 15;
      } else if (fifthAnswer === 2) {
        rubyRails += 15;
      } else if (fifthAnswer === 3) {
        javaAndroid += 15;
      } else if (fifthAnswer === 4) {
        csharpDotnet += 15;
      }
      /* Now we determine which epicodus path has the greatest score and display that result. */
      var max = Math.max(rubyRails, phpDrupal, javaAndroid, cssDesign, csharpDotnet);
      /* Display the highest result. In the case of a tie, display both and change the verbage a bit. */
      var resultNumber = 0;
      if (rubyRails === max) {
        displayResult(".ruby-rails", resultNumber);
        resultNumber += 1;
      }
      if (phpDrupal === max) {
        displayResult(".php-drupal", resultNumber);
        resultNumber += 1;
      }
      if (javaAndroid === max) {
        displayResult(".java-android", resultNumber);
        resultNumber += 1;
      }
      if (cssDesign === max) {
        displayResult(".css-design", resultNumber);
        resultNumber += 1;
      }
      if (csharpDotnet === max) {
        displayResult(".csharp-dotnet", resultNumber);
        resultNumber += 1;
      }
      event.preventDefault();

  });

  $("#btn-retake").on("click", function(event) {
    $(".result").hide();
    $(".results").hide();
    $("form#user-input")[0].reset();
    $("#carousel").carousel(0);
    $(".form").show();
    event.preventDefault();
  });
});

var checkForName = function() {
  firstName = $("#first_name").val();
  lastName = $("#last_name").val();
  if(!firstName && !lastName) {
    $(".first_name_errorhint").text("Please enter your first name");
    $(".last_name_errorhint").text("Please enter your last name");
    $(".first_name, .last_name").addClass("has-error");
    $("form#user-input")[0].reset();
    return false;
  } else if (!firstName) {
    $(".first_name_errorhint").text("Please enter your first name");
    $(".first_name").addClass("has-error");
    $("form#user-input")[0].reset();
    return false;
  } else if (!lastName) {
    $(".last_name_errorhint").text("Please enter your last name");
    $(".last_name").addClass("has-error");
    $("form#user-input")[0].reset();
    return false;
  } else {
    return true;
  }
}

displayResult = function(result, resultNumber) {
  $(".form").hide();
  $("span.first_name").text(firstName);
  $("span.last_name").text(lastName);
  /* Change the verbage used based off whether this is the first result displayed, or any other result after the first one */
  if (resultNumber === 0) {
    $(result + " .result_number").text("ought to");
  } else {
    $(result + " .result_number").text("could also")
  }
  $(result).show();
  $(".results").show()
}
