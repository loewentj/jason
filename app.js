// window.onload = () => {
//     return new Promise(resolve => {
//         let voices = speechSynthesis.getVoices()
//         if (voices.length) {
//           resolve(voices)
//           return
//         }
//         speechSynthesis.onvoiceschanged = () => {
//           voices = speechSynthesis.getVoices()
//           resolve(voices)

//         }
//       })


// };

window.onload = () => {
    let supportMsg = document.getElementById('msg');

    if ('speechSynthesis' in window) {
        supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
    } else {
        supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
        supportMsg.classList.add('not-supported');
    }
}

const players = document.getElementById('player-selector');

const container = document.querySelector('.container');


const btnSubmit = document.querySelector('#btn-submit');
const btnReset = document.querySelector('#btn-reset');

const timer = document.querySelector('#wrapper .timer');

const playerDiv = document.querySelector('#player-div');

const voiceSelect = document.getElementById('voice');
const volumeInput = document.getElementById('volume');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const error = document.getElementById('error');


function loadVoices() {
    // Fetch the available voices.
    let voices = speechSynthesis.getVoices();

    // Loop through each of the voices.
    voices.forEach(function (voice, i) {
        // Create a new option element.
        let option = document.createElement('option');

        // Set the options value and text.
        option.value = voice.name;
        option.innerHTML = voice.name;

        // Add the option to the voice selector.
        voiceSelect.appendChild(option);
    });
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function (e) {
    loadVoices();
};


let people = [];

document.addEventListener('onload', () => {
    voices = window.speechSynthesis.getVoices();
})

players.addEventListener('change', () => {
    let element = document.querySelectorAll('player-names')

    if (element <= 0) {

        inputElement();
        // console.log("if rule")

    } else if (element) {
        let x = document.querySelectorAll('.player-name,.input-div');
        for (let i = x.length - 1; i >= 0; i--) {
            x[i].parentNode.removeChild(x[i]);
            people = [];

        }

        inputElement();

    }

})

btnSubmit.addEventListener('click', () => {
    const playerNames = document.querySelectorAll('.player-name');
    let my_div = document.getElementById('player-div');

    let random = document.getElementById('random').checked;
    playerNames.forEach(player => {

        people.push(player.value);


    });
    if (people.length <= 0) {
        error.innerText = 'Player Selection required';
    } else if (random === true && btnSubmit.textContent === 'Play') {
        countDown();
        error.innerText = '';
    } else if (random === true && btnSubmit.textContent === 'Pause') {

        my_div.textContent = 'Paused';
        btnSubmit.textContent = "Resume";
        btnReset.setAttribute('class', 'show');
        pauseFunction();


    } else if (btnSubmit.textContent === 'Continue') {

        btnSubmit.textContent = "Pause";
        btnReset.setAttribute('class', 'hide');
        nextPlayer();


    }
})



const addPlayers = function () {

    let div = document.createElement("DIV");
    div.setAttribute("class", "input-div");

    let input = document.createElement("INPUT");
    input.setAttribute("class", "player-name");
    input.setAttribute('placeholder', "Player Name")
    container.appendChild(div);
    div.appendChild(input);


}



let inputElement = function () {

    playerSelection = players.options[players.selectedIndex].value;
    let i = 0;
    while (i < Number(playerSelection)) {
        addPlayers([i]);
        i++;

    }


}

let countDown = function () {
    var timeleft = 10;
    var downloadTimer = setInterval(function () {
        document.getElementById("player-div").innerHTML = timeleft;
        timeleft -= 1;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);

            playerDiv.textContent = [people[Math.floor(Math.random(0) * people.length)]];
            btnSubmit.textContent = "Pause";
        }
    }, 1000);

    let timer = document.querySelector('#timer').value;



    setInterval(nextPlayer, timer * 1000);



}

function nextPlayer() {
    if (btnSubmit.textContent === 'Pause') {
        let counter = 0;

        let playersInGame = [people[Math.floor(Math.random(0) * people.length)]];

        let my_div = document.getElementById('player-div');
        my_div.innerHTML = playersInGame[counter % playersInGame.length];
        counter += 1;
        speakNow();

    }

}



function speakNow() {

    // const synth = window.speechSynthesis;

    // let voices = synth.getVoices();

    const speech = new SpeechSynthesisUtterance();

    speech.volume = parseFloat(volumeInput.value);
    speech.rate = parseFloat(rateInput.value);
    speech.pitch = parseFloat(pitchInput.value);

    if (voiceSelect.value) {
        speech.voice = speechSynthesis.getVoices().filter(function (voice) {
            return voice.name == voiceSelect.value;
        })[0];
    }
    // speech.voice = voices[4];
    speech.text = playerDiv.textContent;
    speechSynthesis.speak(speech);



};




const pauseFunction = function () {
    btnSubmit.textContent = "Continue";
    console.log("Paused")
}


btnReset.addEventListener('click', () => {
    let x = document.querySelectorAll('.player-name,.input-div');
    let my_div = document.getElementById('player-div');
    for (let i = x.length - 1; i >= 0; i--) {
        x[i].parentNode.removeChild(x[i]);
        btnReset.setAttribute('class', 'hide');
        my_div.textContent = '';
        btnSubmit.textContent = "Play";
        players.selectedIndex = 0;
        players.focus();
        people = [];
        location.reload();


    }
})