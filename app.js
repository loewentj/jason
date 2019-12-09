const players = document.getElementById('player-selector');

const container = document.querySelector('.container');


const btnSubmit = document.querySelector('#btn-submit');

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
    let random = document.getElementById('random').checked;
    playerNames.forEach(player => {

        people.push(player.value);
    

    });
    
    if (random === true){
       
    //    setTimeout(nextPlayer, 50000)
  
 
    // setInterval(nextPlayer, 10000);
       countDown();
        
               

    }else{
        people.forEach()
        console.log("Sequence Selected");
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

let countDown = function(){
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
      document.getElementById("player-div").innerHTML = timeleft;
      timeleft -= 1;
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        // document.getElementById("player-div").innerHTML = people[0].value;
        playerDiv.textContent = [people[Math.floor(Math.random(0)*people.length)]];
      }
    }, 1000);
    let timer = document.querySelector('#timer').value;
    setInterval(nextPlayer, timer*1000);
}
                                     
function nextPlayer()
{
    
    var counter = 0;
    
    let playersInGame = [people[Math.floor(Math.random(0)*people.length)]];
    
    let my_div = document.getElementById('player-div');
    my_div.innerHTML = playersInGame[counter % playersInGame.length];
    counter += 1;
    speakNow();
    
}


function speakNow(){
    let speech = new SpeechSynthesisUtterance();
    speech.rate = .9;
    speech.pitch = 0.5;
    speech.volume = 1;
    speech.voice = speechSynthesis.getVoices()[0];
    speech.text = playerDiv.textContent;
   
    speechSynthesis.speak(speech);
  

}

