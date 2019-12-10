const players = document.getElementById('player-selector');

const container = document.querySelector('.container');


const btnSubmit = document.querySelector('#btn-submit');
const btnReset = document.querySelector('#btn-reset');

const timer = document.querySelector('#wrapper .timer');

const playerDiv = document.querySelector('#player-div');


let people = [];


players.addEventListener('change', () => {
    let element = document.querySelectorAll('player-names')

    if (element <= 0) {

        inputElement();
        console.log("if rule")

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

    if (random === true && btnSubmit.textContent === 'Play') {
        countDown();
    } else if (random === true && btnSubmit.textContent === 'Pause') {

        my_div.textContent = 'Paused';
        btnSubmit.textContent = "Resume";
        btnReset.setAttribute('class', 'show');
        pauseFunction();
        // nextPlayer();


        ///goes here somewhere

    } else if (btnSubmit.textContent === 'Continue') {

        btnSubmit.textContent = "Pause";
        btnReset.setAttribute('class', 'hide');
        nextPlayer();
        // } else {
        //     let timer = document.querySelector('#timer').value;


        //     setInterval(nextPlayer, timer * 1000);
        // }

    }
})









//    else{
//         // people.forEach()
//         console.log("Sequence Selected");
//     }





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
    // await (200); 


    setInterval(nextPlayer, timer * 1000);


    //setTimeout(setInterval(nextPlayer, timer*1000)),2000;
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
    let speech = new SpeechSynthesisUtterance();
    speech.rate = .9;
    speech.pitch = 0.5;
    speech.volume = 1;
    speech.lang = 'en-US';
    speech.voice = speechSynthesis.getVoices()[0];
    speech.text = playerDiv.textContent;
    speechSynthesis.speak(speech);

}

const pauseFunction = function () {
    btnSubmit.textContent = "Continue";
    console.log("Paused")
}


btnReset.addEventListener('click', ()=>{
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
}})