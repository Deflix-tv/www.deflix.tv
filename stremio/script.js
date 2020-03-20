/**********

  This Pen uses no libraries except fonts and should 
  work on all modern browsers
  
  The answers are stored in the `questions` array
  with the key `answer`. 
  
  inspired by XavierCoulombeM
  https://dribbble.com/shots/2510592-Simple-register-form
  
 **********/

var questions = [
  {question:"Real Debrid API Token"}
]

/*
  do something after the questions have been answered
*/

var onComplete = function() {
    document.getElementById('end-note').innerHTML = "<br/><br/>Or copy this link: <span id='link-block'>https://stremio.deflix.tv/" + questions[0].answer + "/manifest.json</span><br/><br/>And paste it in Stremio's addon search field.";
    var h2 = document.createElement('h2');
    var a = document.createElement('a');
    var linkText = document.createTextNode("Click to Install Addon");
    a.appendChild(linkText);
    a.title = "Install Real Debrid Addon";
    a.href = "stremio://stremio.deflix.tv/" + questions[0].answer + "/manifest.json";
    a.setAttribute("class","install-button");
    h2.appendChild(a)
    setTimeout(function() {
      register.parentElement.appendChild(h2)
      setTimeout(function() {
        h2.style.opacity = 1
        document.getElementById('end-note').style.opacity = 1
      }, 50)
    }, 50)

}

;(function(questions, onComplete) {

    var tTime = 100 // transition transform time from #register in ms
    var wTime = 200 // transition width time from #register in ms

    // init
    // --------------
    if (questions.length == 0) return

    var position = 0

    showCurrent()

    forwardButton.addEventListener('click', validate)
    inputField.addEventListener('keyup', function(e) {
        //transform(0, 0) // ie hack to redraw
        if (e.keyCode == 13) validate()
    })


    // functions
    // --------------

    function validate() {

        var validateCore = function() {      
          return inputField.value.match(questions[position].pattern || /.+/)
        }

        if (!questions[position].validate) questions[position].validate = validateCore

        // check if the pattern matches
        if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))
        else ok(function() {

            // execute the custom end function or the default value set
            if (questions[position].done) questions[position].done()
            else questions[position].answer = inputField.value

            ++position

            // if there is a new question, hide current and load next
            if (questions[position]) hideCurrent(putQuestion)
            else hideCurrent(function() {
                // remove the box if there is no next question
                register.className = 'close'
                //progress.style.width = '100%'

                onComplete()
              
            })

        })

    }


    // helper
    // --------------

    function hideCurrent(callback) {
        inputContainer.style.opacity = 0
        inputLabel.style.marginLeft = 0
        inputContainer.style.border = null
        setTimeout(callback, wTime)
    }

    function showCurrent(callback) {
        inputLabel.innerHTML = "Real Debrid API Token";
        inputField.focus();
        inputContainer.style.opacity = 1
        setTimeout(callback, wTime)
    }

    /*
    function transform(x, y) {
        register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
    }
    */

    function ok(callback) {
        register.className = ''
        setTimeout(callback, tTime * 2)
    }

    function wrong(callback) {
        register.className = 'wrong'
    }

}(questions, onComplete))