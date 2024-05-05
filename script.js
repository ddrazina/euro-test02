const pobjednici = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
};

class Player {
  constructor(userName) {
    this.userName = userName;
  }

  totalPoints = 0;

  round16_01 = { name: "", points: 0, alive: true };
  round16_02 = { name: "", points: 0, alive: true };
  round16_03 = { name: "", points: 0, alive: true };
  round16_04 = { name: "", points: 0, alive: true };
  round16_05 = { name: "", points: 0, alive: true };
  round16_06 = { name: "", points: 0, alive: true };
  round16_07 = { name: "", points: 0, alive: true };
  round16_08 = { name: "", points: 0, alive: true };
  round16_09 = { name: "", points: 0, alive: true };
  round16_10 = { name: "", points: 0, alive: true };
  round16_11 = { name: "", points: 0, alive: true };
  round16_12 = { name: "", points: 0, alive: true };
  round16_13 = { name: "", points: 0, alive: true };
  round16_14 = { name: "", points: 0, alive: true };
  round16_15 = { name: "", points: 0, alive: true };
  round16_16 = { name: "", points: 0, alive: true };

  quarter_01 = { name: "", points: 0, alive: true };
  quarter_02 = { name: "", points: 0, alive: true };
  quarter_03 = { name: "", points: 0, alive: true };
  quarter_04 = { name: "", points: 0, alive: true };
  quarter_05 = { name: "", points: 0, alive: true };
  quarter_06 = { name: "", points: 0, alive: true };
  quarter_07 = { name: "", points: 0, alive: true };
  quarter_08 = { name: "", points: 0, alive: true };

  semi_01 = { name: "", points: 0, alive: true };
  semi_02 = { name: "", points: 0, alive: true };
  semi_03 = { name: "", points: 0, alive: true };
  semi_04 = { name: "", points: 0, alive: true };

  final_01 = { name: "", points: 0, alive: true };
  final_02 = { name: "", points: 0, alive: true };

  champion = { name: "", points: 0, alive: true };
}

let newPlayer;

let counterWinners = 0;
let counterSecond = 0;
let counterThird = 0;
let buttons = document.querySelectorAll(".a, .b, .c, .d, .e, .f");
//document.querySelector("#confirmButton").removeEventListener;

let messageBox = document.getElementById("message");

let logInButton = document.getElementById("logInButton");
logInButton.addEventListener("click", createPlayer);

//funkcija:
function chooseWinner(event) {
  if (event.target.tagName === 'IMG') {
    // Prevent the default action of clicking on the image
    event.preventDefault();
    this.click();
  }
  let eventTargetName = event.target;
  let number01 = 0;
  let color = "darkblue";
  let funct01 = chooseWinner;
  chooseTeam(eventTargetName, funct01, number01, color);

  counterWinners++;
  if (counterWinners === 6) {
    buttons.forEach(function (button) {
      button.addEventListener("click", chooseSecond);
      button.style.cursor = "pointer";
      messageBox.innerHTML =
        "Choose a second placed team from each of the groups!";
    });


    function chooseSecond(event) {
      if (event.target.tagName === 'IMG') {
        // Prevent the default action of clicking on the image
        event.preventDefault();
        this.click();
      }
      let eventTargetName = event.target;
      let number = 1;
      let color = "mediumblue";
      let funct = chooseSecond;
      chooseTeam(eventTargetName, funct, number, color);

      counterSecond++;
      if (counterSecond === 6) {
        buttons.forEach(function (button) {
          button.addEventListener("click", chooseThird);
          button.style.cursor = "pointer";
          messageBox.innerHTML =
            "Choose 4 best third-placed teams, one from each group!";
        });

        function chooseThird(event) {
          if (event.target.tagName === 'IMG') {
            // Prevent the default action of clicking on the image
            event.preventDefault();
            this.click();
          }
          let eventTargetName = event.target;
          let number = 2;
          let color = "blue";
          let funct = chooseThird;
          chooseTeam(eventTargetName, funct, number, color);

          counterThird++;

          console.log(newPlayer)
          console.log(pobjednici)

          if (counterThird === 4) {
            buttons.forEach(function (button) {
              button.removeEventListener("click", chooseThird);
            });
            messageBox.innerHTML = "click CONFIRM for next phase!";
            document
              .querySelector("#confirmButton")
              .addEventListener("click", fillPlayer);
          }
        }
      }
    }
  }
}

function chooseTeam(eventTargetName, funct, number, color) {
  let string01 = "." + eventTargetName.className;
  document.querySelectorAll(string01).forEach(function (button) {
    button.removeEventListener("click", funct);
  });
  let list = ["a", "b", "c", "d", "e", "f"];
  let string02 = eventTargetName.className;
  let tekst = eventTargetName.innerText;
  list.forEach(function (element) {
    if (string02 === element) {
      pobjednici[element][number] = tekst;
    }
  });
  eventTargetName.style.transition = "background-color 1s";
  eventTargetName.style.backgroundColor = color;
  buttons = Array.from(buttons).filter((button) => button !== eventTargetName);
}

function createPlayer() {
  const playerNameInput = document.getElementById("userName");
  const playerName = playerNameInput.value;
  const validCharacters = /^[a-zA-Z0-9]+$/;
  // Check if input is not empty
  if (
    playerName.trim() !== "" &&
    playerName.length <= 15 &&
    validCharacters.test(playerName)
  ) {
    // Create a new instance of Player
    newPlayer = new Player(playerName);
    // You can do whatever you want with the new player instance here
    messageBox.innerHTML = "Choose a winner from each of the groups!";
    buttons.forEach(function (button) {
      button.addEventListener("click", chooseWinner);
      button.style.cursor = "pointer";
    });
    document.getElementById("login").style.display = "none";
  } else {
    messageBox.innerHTML =
      "User name must contain only letters and numbers and up to 15 characters!";
  }
}

function fillPlayer() {
  const keyPairs = [];
  for (key in pobjednici) {
    if (pobjednici[key].length === 3) {
      keyPairs.push(key);
    }
  }
  const matrix = keyPairs[0] + keyPairs[1] + keyPairs[2] + keyPairs[3];
  const matrixData = {
    abcd: ["a", "d", "b", "c"],
    abce: ["a", "e", "b", "c"],
    abcf: ["a", "f", "b", "c"],
    abde: ["d", "e", "a", "b"],
    abdf: ["d", "f", "a", "b"],
    abef: ["e", "f", "b", "a"],
    acde: ["e", "d", "c", "a"],
    acdf: ["f", "d", "c", "a"],
    acef: ["e", "f", "c", "a"],
    adef: ["e", "f", "d", "a"],
    bcde: ["e", "d", "b", "c"],
    bcdf: ["f", "d", "c", "b"],
    bcef: ["f", "e", "c", "b"],
    bdef: ["f", "e", "d", "b"],
    cdef: ["f", "e", "d", "c"],
  };
  for (key in matrixData) {
    if (matrix === key) {
      newPlayer.round16_02.name = pobjednici[`${matrixData[key][0]}`][2];
      newPlayer.round16_14.name = pobjednici[`${matrixData[key][1]}`][2];
      newPlayer.round16_10.name = pobjednici[`${matrixData[key][2]}`][2];
      newPlayer.round16_06.name = pobjednici[`${matrixData[key][3]}`][2];
    }
  }

  newPlayer.round16_01.name = pobjednici.b[0];

  newPlayer.round16_03.name = pobjednici.a[0];
  newPlayer.round16_04.name = pobjednici.c[1];
  newPlayer.round16_05.name = pobjednici.f[0];

  newPlayer.round16_07.name = pobjednici.d[1];
  newPlayer.round16_08.name = pobjednici.e[1];
  newPlayer.round16_09.name = pobjednici.e[0];

  newPlayer.round16_11.name = pobjednici.d[0];
  newPlayer.round16_12.name = pobjednici.f[1];
  newPlayer.round16_13.name = pobjednici.c[0];

  newPlayer.round16_15.name = pobjednici.a[1];
  newPlayer.round16_16.name = pobjednici.b[1];

  console.log(newPlayer)

/*   for (let i = 1; i < 17; i++) {
    const id = i < 10 ? `0${i}` : `${i}`;
    document.getElementById(`16R${id}`).innerText =
      newPlayer[`round16_${id}`].name;
  } */
  console.log(newPlayer)
}

function fillTheBracket() {
  
}

function undo() {
  
}