let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new SpeechRecognition()

let textbox = $("#textbox")

let instructions = $("#instructions")

let content = ''
recognition.interimResults = true;

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Voice Recognition is on")
}

recognition.onspeechend = function() {
    instructions.text("Voice Recognition is off due to No Activity or Stop Button pressed.")
}

recognition.onerror = function () {
    instructions.text("Try Again")
}

recognition.onresult = function (e) {
    e.preventDefault()
    let current = e.resultIndex;
    let interim = ''
    let transcript = e.results[current][0].transcript
    let mobileRepeatBug = (current == 1 && transcript == e.results[0][0].transcript);
    if(!mobileRepeatBug){
        for (let i = e.resultIndex; i < e.results.length; ++i) {
            
        if (e.results[i].isFinal) {
        content +=  transcript
        } else {
            interim += transcript
        }
    }
    }
    textbox.val(content + interim)

    // setTimeout(() => {
    //     recognition.start();
    //   }, 50);
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
    // if(interim.length) {
    //     interim += ''
    // }
    recognition.start()
}
})

$("#clear").click(function () {
    textbox.val("");
    location.reload()
  });

textbox.on('input', function () {
    // interim = $(this).val()
    content = $(this).val()
})