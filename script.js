let SpeechRecognition = window.webkitSpeechRecognition
let recognition = new SpeechRecognition()

let textbox = $("#textbox")

let instructions = $("#instructions")

let content = ''

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Voice Recognition is on")
}

// recognition.onspeechend = function() {
//     instructions.text("No Activity")
// }

recognition.onerror = function () {
    instructions.text("Try Again")
}

recognition.onresult = function (e) {
    let current = e.resultIndex;

    let transcript = e.results[current][0].transcript
    // let  = (current == 1 && transcript == e.results[0][0].transcript);
    // if(!mobileRepeatBug){
    //     content +=  transcript
    //     textbox.val(content)
    // }

    content +=  transcript
        textbox.val(content)

    setTimeout(() => {
        recognition.start();
      }, 50);
}

$("#start-btn").click(function(e) {
    if ($(this).text() == "Stop Recording") {
        $(this).html("Start Recording");
        $("#instructions").html("Press the Start Button");
        recognition.stop();
      } else {
    $(this).html("Stop Recording")
    if(content.length) {
        content += ''
    }
    recognition.start()
}
})

$("#clear").click(function () {
    textbox.val("");
    // $("#start").html("Start Recording")
  });

textbox.on('input', function () {
    content = $(this).val()
})