


let input = document.getElementById("inp");
let details = document.getElementById("details");
let date = document.getElementById("date");
let add = document.getElementById("submit");
let parent = document.getElementById("todolist");
let plus = document.getElementById("plus");
let edit = document.querySelector(".edit");
const numstill = document.getElementById("numstill");
let filterItem;
let idTask;

plus.addEventListener("click", function () {
    openWindow("add");
});

//clicking on add buttom

function openWindow(option) {
    if (option == "add") {
        add.value = "add";
        document.getElementById("myWindow").style.display = "block";
    if (input.value !== "" && details.value !== "" && date.value !== "") {
        addItems(input.value, details.value, date.value);
        input.value = "";
        details.value = "";
        date.value = "";
    }
} else {
    add.value = "edit";
    document.getElementById("myWindow").style.display = "block";
    }
}

// empty array to store the tasks
let todoItems = [];

// Check if Tteres tasks in Local storage
if (localStorage.getItem("Tasks")) {
    todoItems = JSON.parse(localStorage.getItem("Tasks"));
}

// Trigger get data from localstorage function
getDataFromLocalStorage();

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("Tasks");
    if (data) {
    let tasks = JSON.parse(data);
    showList(tasks);
    }
}

add.addEventListener("click", function (event) {
    document.getElementById("myWindow").style.display = "none";
    event.preventDefault();
    if (add.value == "add") {
        if (input.value !== "" && details.value !== "" && date.value !== "") {
            addItems(input.value, details.value, date.value);
            input.value = "";
            details.value = "";
            date.value = "";
        }
    } else {
    checkValue();
}
});

function addItems() {
    let idItem = Date.now();
    const todo = {
        title: input.value,
        details: details.value,
        date: date.value,
        checked: false,
        id: idItem,
    };

    let container = document.createElement("div");
    container.setAttribute("data-id", todo.id);

    if (localStorage.getItem("Tasks") === null) {
    todoItems = [];
    } else {
    todoItems = JSON.parse(localStorage.getItem("Tasks"));
    }

    todoItems.push(todo);

    // Adding into LocalStorge
    localStorage.setItem("Tasks", JSON.stringify(todoItems));
    
    showList();
}
function showList() {
    let data = JSON.parse(localStorage.getItem("Tasks"));
    parent.innerHTML = "";
    if (data) {
        data.forEach(function (item , index) {
            
            // Create Main Div
            let container = document.createElement("div");
            
            container.setAttribute("class", "task");
            container.setAttribute("data-id", item.id);
            parent.appendChild(container);
            
         
            container.innerHTML = `<input type='checkbox' id='checkbox' ${
            item.checked ? "checked" : ""
            } onclick='completeTask(${index});'/> 
                    <h3 class="taskTitle">${item.title}</h3>
                    <p>${item.details}<br>${item.date}</p>
                    <i class='fas fa-trash delete' id="delete" ></i><i class='fas fa-edit edit' onclick="editWindow(${
                        item.id
                    })"></i>`;
            parent.insertBefore(container, parent.childNodes[0]);
    });
    }
}



//check Icon
function completeTask(index) {
    let title =
    document.querySelectorAll(".taskTitle")[todoItems.length - index - 1];
    
    let checkbox =
    document.querySelectorAll("[type=checkbox]")[todoItems.length - index - 1];
    
    if (checkbox.checked) {
    title.style.textDecoration = "line-through";
    todoItems[index].checked = true;
    } else {
    title.style.textDecoration = "none";
    todoItems[index].checked = false;
    }

    localStorage.setItem("Tasks", JSON.stringify(todoItems));
}

//edit Icon

// checking value for edit
function checkValue() {
    if (
        input.value !== filterItem.title ||
        details.value !== filterItem.details ||
        date.value !== filterItem.date
    ) {
        todoItems = JSON.parse(localStorage.getItem("Tasks"));
        for (let i = 0; i < todoItems.length; i++) {
            if (todoItems[i].id == idTask) {
                todoItems[i].title = input.value;
                todoItems[i].details = details.value;
                todoItems[i].date = date.value;
            }
        }
        // put the new values in localst
        localStorage.setItem("Tasks", JSON.stringify(todoItems));
        showList();
    }
}
function editWindow(idItem) {
    openWindow("edit");
    todoItems = JSON.parse(localStorage.getItem("Tasks"));
    
    filterItem = todoItems.filter((task) => task.id == idItem)[0];
    input.value = filterItem.title;
    details.value = filterItem.details;
    date.value = filterItem.date;
    idTask = idItem;
}

// Delete Icon

// Click On Task Element
parent.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("delete")) {
      // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

      // Remove Element From Page
    e.target.parentElement.remove();
    }
});

function deleteTaskWith(taskId) {
    todoItems = todoItems.filter((task) => task.id != taskId);
    localStorage.setItem("Tasks", JSON.stringify(todoItems));
}
