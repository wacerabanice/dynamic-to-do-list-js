document.addEventListener("DOMContentLoaded", function () {
  
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

 
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  
  function createTaskElement(taskText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    
    removeButton.addEventListener("click", function () {
     if (li.parentNode === taskList) {
        taskList.removeChild(li);
      }

      
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    });

   
    li.appendChild(removeButton);
    return li;
  }


  function addTask(inputText = null, save = true) {
    let taskText;

    
    if (inputText === null) {
      taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
    } else {
      taskText = String(inputText).trim();
      if (taskText === "") return; 
    }

    
    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    
    if (save) {
      tasks.push(taskText);
      saveTasks();
    }

    if (inputText === null) {
      taskInput.value = "";
    }
  }

 
  function loadTasks() {
    tasks.forEach((t) => addTask(t, false)); 
  }

 
  addButton.addEventListener("click", function () {
    addTask();
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

 
  loadTasks();
});
