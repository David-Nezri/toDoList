const cardsContainer = document.getElementById("cardsContainer");
let missions;
let trashs;
websiteInit();

//const imgUrl = document.getElementById('UsheringUrl');
//const imgUrlError = document.getElementById('imgUrlError');

const note = document.getElementById("textareaMission");
console.log(note.value);
const MissioEnrror = document.getElementById("MissioEnrror");

const Date = document.getElementById("inputDate");
const DateError = document.getElementById("DateError");

const Time = document.getElementById("inputTime");
const TimeError = document.getElementById("TimeError");

// Initialize website
function websiteInit() {
  if (localStorage.getItem("missions")) {
    const strMissions = localStorage.getItem("missions");
    missions = JSON.parse(strMissions);
  } else {
    missions = [];
  }
  if (localStorage.getItem("trash")) {
    const strTrash = localStorage.getItem("trash");
    trashs = JSON.parse(strTrash);
  } else {
    trashs = [];
  }

  drawCards();
  console.log("Website initialize...");
  console.log(missions);
}

function drawTrash() {
  drawCards(true);
}

function validationErrors(obj) {
  // check for error
  //imgUrlError.innerHTML = obj.imgUrl ? '' : 'Please fill the imgUrl';
  MissioEnrror.innerHTML = obj.textareaMission
    ? ""
    : "Please fill the text area Mission";
  DateError.innerHTML = obj.inputDate ? "" : "Please fill the input Date";
  TimeError.innerHTML = obj.inputTime ? "" : "Please fill the input Time";
  if (/*!obj.imgUrl ||*/ !obj.note || !obj.Date || !obj.Time) {
    return false;
  } else {
    return true;
  }
}

function clearForm() {
  // clean form
  //imgUrl.value = '';
  note.value = "";
  Date.value = "";
  Time.value = "";

  // clean errors
  //imgUrlError.innerHTML = '';
  MissioEnrror.innerHTML = "";
  DateError.innerHTML = "";
  TimeError.innerHTML = "";

  cardsContainer.innerHTML = "";
}

function getFormValues() {
  return {
    id: missions.length,
    checked: false,
    //imgUrl: imgUrl.value,
    note: note.value,
    Date: Date.value,
    Time: Time.value,
  };
}

function addmissionsToLocalStorage(mission) {
  missions.push(mission);
  const stringifymission = JSON.stringify(missions);
  localStorage.setItem("missions", stringifymission);
}

function updateMissionToLocalStorage() {
  const stringifymission = JSON.stringify(missions);
  localStorage.setItem("missions", stringifymission);
}

function updateTrashToLocalStorage() {
  const stringifyTrash = JSON.stringify(trashs);
  localStorage.setItem("trash", stringifyTrash);
}

function addNewMission() {
  const newMission = getFormValues();
  const validation = validationErrors(newMission);
  if (validation) {
    addmissionsToLocalStorage(newMission);
    clearForm();
    websiteInit();
  }
}

function deleteMission(index) {
  missions.splice(index, 1);
  updateMissionToLocalStorage();
  websiteInit();
}

function deletemissionFromTrash(index) {
  trashs.splice(index, 1);
  updateTrashToLocalStorage();
  websiteInit();
}

function addMissionsToTrash(mission) {
  trashs.push(mission);
  const stringifyTrash = JSON.stringify(trashs);
  localStorage.setItem("trash", stringifyTrash);
}

function drawCards(isTrash) {
  cardsContainer.innerHTML = "";

  if (isTrash) {
    for (const item of trashs) {
      const missionIndex = missions.indexOf(item);
      const cardBox = document.createElement("div");

      // const cardImg = document.createElement('img');
      const cardNote = document.createElement("h2");
      const cardDate = document.createElement("p");
      const cardTime = document.createElement("p");

      const deleteButton = document.createElement("button");
      const isTrasheButton = document.createElement("button");

      //cardImg.src = item.imgUrl;
      cardNote.innerHTML = item.note;
      cardDate.innerHTML = item.Date;
      cardTime.innerHTML = item.Time;

      deleteButton.addEventListener("click", function () {
        deleteMission(missionIndex);
      });
      deleteButton.innerHTML = '<i class="bi bi-backspace"></i> ';
      isTrasheButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
      isTrasheButton.addEventListener("click", function () {
        deletemissionFromTrash(item);
      });

      // cardBox.appendChild(cardImg);
      cardBox.appendChild(cardNote);
      cardBox.appendChild(cardDate);
      cardBox.appendChild(cardTime);
      cardBox.appendChild(deleteButton);
      cardBox.appendChild(isTrasheButton);

      cardsContainer.appendChild(cardBox);
    }
  } else {
    for (const item of missions) {
      const missionIndex = missions.indexOf(item);
      const cardBox = document.createElement("div");

      // const cardImg = document.createElement('h2');
      const cardNote = document.createElement("p");
      const cardDate = document.createElement("p");
      const cardTime = document.createElement("p");

      const deleteButton = document.createElement("button");
      const isTrasheButton = document.createElement("button");

      // cardImg.src = item.imgUrl;
      cardNote.innerHTML = item.note;
      cardTime.innerHTML = item.Date;
      cardDate.innerHTML = item.Time;

      deleteButton.addEventListener("click", function () {
        deleteMission(missionIndex);
      });
      deleteButton.innerHTML = ' <i class="bi bi-file-earmark-minus"></i>  ';
      isTrasheButton.innerHTML =
        '<i class="bi bi-check-circle"></i></br>done&remove';
      isTrasheButton.addEventListener("click", function () {
        addMissionsToTrash(item);
      });

      //cardBox.appendChild(cardImg);
      cardBox.appendChild(cardNote);
      cardBox.appendChild(cardDate);
      cardBox.appendChild(cardTime);
      cardBox.appendChild(deleteButton);
      cardBox.appendChild(isTrasheButton);

      cardsContainer.appendChild(cardBox);
    }
  }
}
