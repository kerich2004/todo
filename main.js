let input = document.getElementById("input");
let res = document.getElementById("res");
let del = document.getElementById("delete");
let work = document.getElementsByClassName("work");
let delAll = document.getElementById("deleteAll");
let record = document.getElementById("record");
let btn = document.querySelector("#workValue");

if (localStorage.getItem("todo") == undefined) {
  let toDoList = [];
} else {
  toDoList = JSON.parse(localStorage.getItem("todo"));
  for (let key in toDoList) {
    if (toDoList[key].checked == false) {
      res.insertAdjacentHTML(
        "beforeend",
        "<div class = 'work'> <input type='checkbox'>" +
          toDoList[key].data +
          "</div>"
      );
      work[key].style.background = "green";
    }
  }
}

record.onclick = function () {
  toDoList.push({ data: input.value, checked: false });
  for (let i = toDoList.length - 1; i < toDoList.length; i++) {
    res.insertAdjacentHTML(
      "beforeend",
      "<div class = 'work' onchange = change()> <input type='checkbox'>" +
        toDoList[toDoList.length - 1].data +
        "</div>"
    );
    work[i].style.background = "green";
    console.log(work);
    addToLocalStorage();
  }
};

del.onclick = function removeDiv() {
  work[work.length - 1].remove();
  toDoList.splice(work.length, 1);
  console.log(toDoList);
  addToLocalStorage();
};

function change() {
  for (let j = 0; j < work.length; j++) {
    let elements = document.querySelectorAll("div.work");
    elements[j].index = j;

    elements[j].onchange = function () {
      toDoList[this.index].checked = false
        ? toDoList[this.index].checked == true
        : toDoList[this.index].checked == false;

      addToLocalStorage();
    };
  }
}

function addToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(toDoList));
}

delAll.onclick = function () {
  toDoList = [];
  addToLocalStorage();
  location.href = location.href;
};

btn.onclick = function () {
  alert(work.length);
};
