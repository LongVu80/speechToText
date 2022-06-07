let SpeechRecognition = window.webkitSpeechRecognition
let recognition = new SpeechRecognition()

let textbox = $("#textbox")

let instructions = $("#instructions")

let content = '';

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Voice Recognition is on")
}

recognition.onspeechend = function() {
    instructions.text("Voice Recognition is off due to No Activity or Stop. Please press Start Button again")
}

recognition.onerror = function () {
    instructions.text("Try Again")
}

recognition.onresult = function (e) {
    let current = e.resultIndex;

    let transcript = e.results[current][0].transcript
    let mobileRepeatBug = (current == 1 && transcript == e.results[0][0].transcript);
    if(!mobileRepeatBug){
        content +=  transcript
        textbox.val(content)
    }

    // content +=  transcript
    //     textbox.val(content)

    setTimeout(() => {
        recognition.start();
      }, 50);
}

$("#start-btn").click(function(e) {
    if ($(this).text() == "Stop") {
        $(this).html("Start");
        $("#instructions").html("Press the Start Button");
        recognition.stop();
      } else {
    $(this).html("Stop")
    if(content.length) {
        content += ''
    }
    setTimeout(() => {
        recognition.start();
      }, 50);
}
})

$("#clear").click(function () {
    textbox.val("");
    location.reload()
  });

textbox.on('input', function () {
    content = $(this).val()
})