let SpeechRecognition = window.webkitSpeechRecognition
let recognition = new SpeechRecognition()

let textbox = $("#textbox")
let textbox2 = $('#textbox2')

let instructions = $("#instructions")

let content = '';

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Voice Recognition is on")
}

recognition.onend = function() {
    recognition.start()
}

recognition.onerror = function () {
    instructions.text("Sorry, this Web Platform does not support Google Speech Regconition. Please use keyboard microphone. With keyboard microphone, you can even use your native language.")
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
        // textbox2.val(content)

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



// textbox2.on(content)

// document.querySelector('#textbox').addEventListener('input', function(e){
//     document.querySelector('#textbox2').innerHTML = `<strong class="text-light notranslate">Translation:</strong> <div class="form-control bg-dark text-light" style="border: 1px solid gray; border-radius: 8px;">${e.target.value}</div>`
//   })



function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }

// $(document).ready(function(){

//     $('#trans').click(function() {
//      google.language.translate($('#textbox').html(), 'en',  function(result)         
//      {
//         $('#textbox').html(result.translation);
//      });
//     });
//    });