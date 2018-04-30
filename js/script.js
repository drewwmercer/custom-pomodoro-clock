$(document).ready(function() {
  var timerValue = 25;
  $("p#timer").text(timerValue);
  var pauseValue = 5;
  $("p#pause").text(pauseValue);
  var started = 0;
  var startedAgain = 0;

  function nextItemTimer() {
    timerValue = timerValue + 5;
    $("p#timer").text(timerValue);
    if (timerValue >= 60) {
      $("button#timer-increase").prop("disabled", true);
    } else if (timerValue == 6) {
      timerValue = 5;
      $("p#timer").text(timerValue);
      $("button#timer-decrease").prop("disabled", false);
    } else if (timerValue <= 10) {
      $("button#timer-decrease").prop("disabled", false);
    }
  }

  function prevItemTimer() {
    timerValue = timerValue - 5;
    $("p#timer").text(timerValue);
    if (timerValue < 5) {
      timerValue = 1;
      $("p#timer").text(timerValue);
      $("button#timer-decrease").prop("disabled", true);
    } else if (timerValue >= 10) {
      $("button#timer-increase").prop("disabled", false);
    }
  }

  $("button#timer-increase").click(function() {
    nextItemTimer();
  });

  $("button#timer-decrease").click(function() {
    prevItemTimer();
  });

  function nextItemPause() {
    pauseValue = pauseValue + 5;
    $("p#pause").text(pauseValue);
    if (pauseValue >= 60) {
      $("button#pause-increase").prop("disabled", true);
    } else if (pauseValue == 6) {
      pauseValue = 5;
      $("p#pause").text(pauseValue);
      $("button#pause-decrease").prop("disabled", false);
    } else if (pauseValue <= 10) {
      $("button#pause-decrease").prop("disabled", false);
    }
  }

  function prevItemPause() {
    pauseValue = pauseValue - 5;
    $("p#pause").text(pauseValue);
    if (pauseValue < 5) {
      pauseValue = 1;
      $("p#pause").text(pauseValue);
      $("button#pause-decrease").prop("disabled", true);
    } else if (pauseValue >= 10) {
      $("button#pause-increase").prop("disabled", false);
    }
  }

  $("button#pause-increase").click(function() {
    nextItemPause();
  });

  $("button#pause-decrease").click(function() {
    prevItemPause();
  });

  function countdownTimer() {
    var stopped = false;
    var timeLater = new Date().getTime() + timerValue * 60000;

    $("button.countdown-changer").prop("disabled", true);

    var startingPoint = timerValue;
    var seconds = 0;
    var startCountdown = setInterval(function(x) {
      if (stopped == false) {
        if (seconds == 0 && startingPoint > 1) {
          startingPoint--;
          seconds = 59;
        } else if (seconds == 0 && startingPoint <= 1) {
          startingPoint--;
          seconds = 59;
        } else {
          seconds--;
        }

        if (seconds.toString().length > 1) {
          $("p#timer").text(startingPoint + ":" + seconds);
        } else {
          $("p#timer").text(startingPoint + ":" + "0" + seconds.toString());
        }

        if (startingPoint == 0 && seconds == 0) {
          clearInterval(startCountdown);
          $("p#timer").text("DONE");
          //   alarm.currentTime = 0;
          setTimeout(function() {
            countdownPause();
          }, 5000);
        }
      }
    }, 1000);

    $("button#restart").click(function(e) {
      if (started == 1) {
        clearInterval(startCountdown);
        $(this).prop("disabled", true);
        $("button#pause-resume").prop("disabled", true);
        $("p#timer").text(timerValue);
        $("p#pause").text(pauseValue);
        $("button#start").prop("disabled", false);
        $("button.countdown-changer").prop("disabled", false);
        $("span#status-info").text("IDLE");
        $("span#status-info").css("color", "black");
        e.preventDefault();
        stopped = false;
        $("button#pause-resume").text("Pause");
        started = 2;
      } else if (started == 2) {
        clearInterval(startCountdown);
        $(this).prop("disabled", true);
        $("button#pause-resume").prop("disabled", true);
        $("p#timer").text(timerValue);
        $("p#pause").text(pauseValue);
        $("button#start").prop("disabled", false);
        $("button.countdown-changer").prop("disabled", false);
        $("span#status-info").text("IDLE");
        $("span#status-info").css("color", "black");
        e.preventDefault();
        stopped = false;
        $("button#pause-resume").text("Pause");
        started = 2;
      }
    });

    $("button#pause-resume").click(function(e) {
      if (!stopped) {
        e.preventDefault();
        stopped = true;
        $("button#pause-resume").text("Resume");
        $("span#status-info").text("PAUSED");
        $("span#status-info").css("color", "blue");
      } else {
        e.preventDefault();
        stopped = false;
        $("button#pause-resume").text("Pause");
        $("span#status-info").text("IN PROGRESS");
        $("span#status-info").css("color", "green");
      }
    });
  }

  function countdownPause() {
    var stoppedPause = false;
    var timeLaterPause = new Date().getTime() + timerValue * 60000;

    $("button.countdown-changer").prop("disabled", true);

    var startingPointPause = pauseValue;
    var secondsPause = 00;
    var startCountdownPause = setInterval(function(x) {
      if (!stoppedPause) {
        if (secondsPause == 0 && startingPointPause > 1) {
          startingPointPause--;
          secondsPause = 59;
        } else if (secondsPause == 0 && startingPointPause <= 1) {
          startingPointPause--;
          secondsPause = 59;
        } else {
          secondsPause--;
        }

        // Display the result in the element with id="demo"
        if (secondsPause.toString().length > 1) {
          $("p#pause").text(startingPointPause + ":" + secondsPause);
        } else {
          $("p#pause").text(
            startingPointPause + ":" + "0" + secondsPause.toString()
          );
        }

        // If the count down is finished, write some text
        if (startingPointPause == 0 && secondsPause == 0) {
          clearInterval(startCountdownPause);
          $("p#pause").text("DONE");
          setTimeout(function() {
            $("button#restart").click();
          }, 6000);
        }
      }
    }, 1000);

    $("button#restart").click(function(e) {
      if (started == 1) {
        clearInterval(startCountdownPause);
        $(this).prop("disabled", true);
        $("button#pause-resume").prop("disabled", true);
        $("p#timer").text(timerValue);
        $("p#pause").text(pauseValue);
        $("button#start").prop("disabled", false);
        $("button.countdown-changer").prop("disabled", false);
        $("span#status-info").text("IDLE");
        $("span#status-info").css("color", "black");
        e.preventDefault();
        stopped = false;
        $("button#pause-resume").text("Pause");
        started = 2;
      } else if (started == 2) {
        clearInterval(startCountdownPause);
        $(this).prop("disabled", true);
        $("button#pause-resume").prop("disabled", true);
        $("p#timer").text(timerValue);
        $("p#pause").text(pauseValue);
        $("button#start").prop("disabled", false);
        $("button.countdown-changer").prop("disabled", false);
        $("span#status-info").text("IDLE");
        $("span#status-info").css("color", "black");
        e.preventDefault();
        stopped = false;
        $("button#pause-resume").text("Pause");
        started = 2;
      }
    });

    $("button#pause-resume").click(function(e) {
      if (!stoppedPause) {
        e.preventDefault();
        stoppedPause = true;
        $("button#pause-resume").text("Resume");
        $("span#status-info").text("PAUSED");
        $("span#status-info").css("color", "blue");
      } else {
        e.preventDefault();
        stoppedPause = false;
        $("button#pause-resume").text("Pause");
        $("span#status-info").text("IN PROGRESS");
        $("span#status-info").css("color", "green");
      }
    });
  }

  $("button#start").click(function() {
    if (started == 0) {
      countdownTimer();
      $("button#start-restart").text("Restart");
      $(this).prop("disabled", true);
      $("button#pause-resume").prop("disabled", false);
      $("button#restart").prop("disabled", false);
      $("span#status-info").text("IN PROGRESS");
      $("span#status-info").css("color", "green");
      started = 1;
    } else if (started == 2) {
      countdownTimer();
      $("button#start-restart").text("Restart");
      $(this).prop("disabled", true);
      $("button#pause-resume").prop("disabled", false);
      $("button#restart").prop("disabled", false);
      $("span#status-info").text("IN PROGRESS");
      $("span#status-info").css("color", "green");
    }
  });
});
