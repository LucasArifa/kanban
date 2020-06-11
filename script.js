// VARIABLES
// ADD TASK
const addTaskButton = window.document.getElementById("addTaskButtonId");
const inputTaskTitle = window.document.getElementById("inputFieldId");

// TASKS EVENTELISTENER
addTaskButton.addEventListener("click", startTaskAddition);
addTaskButton.addEventListener("click", ajaxRequest);
// KEYBOARD ENTER - ADD TASK
inputTaskTitle.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    startTaskAddition();
  }
});
// TASKS FIELDS
const toDoTasks = document.getElementById("divToDoId");
const doingTasks = document.getElementById("divDoingId");
const doneTasks = document.getElementById("divDoneId");
//TASKS ARRAY
var tasksArray = [];
//FUNCTIONS
//ONLOAD REMOVER TODAS PROPRIEDADES DO ARRAY
window.onload = function () {
  tasksArray = [];
};
function startTaskAddition() {
  let varTaskStringRight = inputTaskTitle.value
    .trim()
    .normalize("NFD")
    .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "");

    criteriaToAdd(varTaskStringRight)
}
// criteria to add
function criteriaToAdd(varTaskStringRight) {
  if (inputTaskTitle.value == "") {
    alert("ESCREVA UM TÍTULO");
  } else if (verifyCharacteres(inputTaskTitle.value) == false) {
    alert("INSIRA APENAS NÚMEROS OU LETRAS");
  } else if (tasksArray.indexOf(varTaskStringRight) > -1) {
    alert("TÍTULO JÁ EXISTE, ESCOLHA OUTRO");
  } else if (tasksArray.indexOf(varTaskStringRight) === -1) {
    addTask(varTaskStringRight);
  }
}
// APENAS NUMEROS E LETRAS , LETRAS ACENTUADAS
function verifyCharacteres(taskString) {
  var letters = /^[0-9a-záàâãéèêíïóôõöúçñ ]+$/i;
  if (taskString.match(letters)) {
    return true;
  } else {
    return false;
  }
}
// ADD A TASK
function addTask(varTaskStringRight) {
  tasksArray.push(varTaskStringRight.toString());
  createTask(inputTaskTitle.value, varTaskStringRight);
  inputTaskTitle.value = "";
}
// Ajax Request
function ajaxRequest() {
  console.log("AJAXRequest");
}
// CREATE AN ELEMENT -FUNCTION
function createTask(taskString, varTaskStringRight) {
  let div = document.createElement("div");
  let h4 = document.createElement("h4");
  let spanDots = document.createElement("span");
  let spanMore = document.createElement("span");
  let textarea = document.createElement("textarea");
  let img = document.createElement("img");
  let imgCloseButton = document.createElement("img");
  let imgCheckButton = document.createElement("img");
  let divNextStepButton = document.createElement("div");
  let divDeleteButton = document.createElement("div");
  let divDeleteButtonClose = document.createElement("div");
  let divNextStepButtonClose = document.createElement("div");
  

  toDoTasks.appendChild(div);
  div.appendChild(h4);
  div.appendChild(spanDots);
  spanDots.appendChild(divDeleteButtonClose);
  divDeleteButtonClose.appendChild(imgCloseButton);
  spanDots.appendChild(divNextStepButtonClose);
  divNextStepButtonClose.appendChild(imgCheckButton);
  div.appendChild(spanMore);
  spanMore.appendChild(textarea);
  spanMore.appendChild(divNextStepButton);
  spanMore.appendChild(divDeleteButton);
  div.appendChild(img);

  h4.innerText = taskString;
  divDeleteButton.innerText = "DELETE";
  divNextStepButton.innerText = "NEXT STEP";

  div.setAttribute("class", "field-Criteria taskDiv");
  div.setAttribute("name", "task");
  div.setAttribute("id", `taskDivId${varTaskStringRight}`);
  div.setAttribute("draggable", "true");
  div.setAttribute("ondragstart", "drag(event)");

  h4.setAttribute("id", `${varTaskStringRight}`);

  spanDots.setAttribute("id", `dots${varTaskStringRight}`);
  spanDots.setAttribute("class", "dotsClass");

  divDeleteButtonClose.setAttribute(
    "class",
    "field-Criteria deleteButtonCloseClass"
  );
  divDeleteButtonClose.setAttribute(
    "onclick",
    `deleteTask(taskDivId${varTaskStringRight}, ${varTaskStringRight})`
  );

  imgCloseButton.setAttribute("src", "images/close.png");
  imgCloseButton.setAttribute("class", "imgCloseButtonClass");
  imgCloseButton.setAttribute("draggable", "false");

  divNextStepButtonClose.setAttribute(
    "class",
    "field-Criteria nextStepButtonCheckClass"
  );
  divNextStepButtonClose.setAttribute(
    "onclick",
    `nextStepTask(taskDivId${varTaskStringRight}, ${varTaskStringRight})`
  );

  imgCheckButton.setAttribute("src", "images/check.png");
  imgCheckButton.setAttribute("class", "imgCheckButtonClass");
  imgCheckButton.setAttribute("draggable", "false");

  spanMore.setAttribute("id", `more${varTaskStringRight}`);
  spanMore.setAttribute("class", "moreClass");

  textarea.setAttribute("name", "taskDetailsName");
  textarea.setAttribute("id", "taskDetailsId");
  textarea.setAttribute("cols", "30");
  textarea.setAttribute("rows", "10");
  textarea.setAttribute("maxlength", "500");
  textarea.setAttribute("placeholder", "ADD TASKS DETAILS");
  textarea.setAttribute("wrap", "on");

  divDeleteButton.setAttribute("class", "field-Criteria deleteButtonClass");
  divDeleteButton.setAttribute("id", `deleteId${varTaskStringRight}`);
  divDeleteButton.setAttribute(
    "onclick",
    `deleteTask(taskDivId${varTaskStringRight}, ${varTaskStringRight})`
  );

  divNextStepButton.setAttribute("class", "field-Criteria nextStepButtonClass");
  divNextStepButton.setAttribute("id", `nextStepId${varTaskStringRight}`);
  divNextStepButton.setAttribute(
    "onclick",
    `nextStepTask(taskDivId${varTaskStringRight}, ${varTaskStringRight})`
  );

  img.setAttribute("class", "arrowDown");
  img.setAttribute("id", `arrowDownId${varTaskStringRight}`);
  img.setAttribute("src", "images/arrow-down.png");
  img.setAttribute("alt", "Arrow Down");
  img.setAttribute("draggable", "false");
  img.setAttribute(
    "onclick",
    `details(dots${varTaskStringRight}, more${varTaskStringRight}, arrowDownId${varTaskStringRight})`
  );
}
// SHOWMORE DETAILS
function details(dotsId, moreId, imgId) {
  if (dotsId.style.display === "none") {
    dotsId.style.display = "inline";
    imgId.className = "arrowDown";
    moreId.style.display = "none";
  } else {
    dotsId.style.display = "none";
    imgId.className = "arrowUp";
    moreId.style.display = "inline";
  }
}
// NEXT STEP BUTTON
function nextStepTask(taskDivId, taskTitle) {
  if (taskDivId.parentNode.id == "divToDoId") {
    doingTasks.appendChild(taskDivId);
  } else if (taskDivId.parentNode.id == "divDoingId") {
    doneTasks.appendChild(taskDivId);
  } else {
    deleteTask(taskDivId, taskTitle);
  }
}
// DELETE BUTTON
function deleteTask(taskDivId, taskTitle) {
  taskDivId.remove();
  removeArrayItem(taskTitle);
}
function removeArrayItem(taskTitle) {
  taskTitleString = taskTitle.toString();
  tasksArray.splice(tasksArray.indexOf(taskTitleString), 1);
}
// DRAG AND DROP
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev, el) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  el.appendChild(document.getElementById(data));
}
