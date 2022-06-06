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

    content +=  transcript

    textbox.val(content)
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