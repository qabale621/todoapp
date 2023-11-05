 // Retrieve tasks from localStorage
          function getTasksFromStorage() {
            return JSON.parse(localStorage.getItem("tasks")) || [];
          }
    
          // Display tasks in the list
          function displayTasks() {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            const tasks = getTasksFromStorage();
            tasks.forEach(task => createTaskElement(task));
          }
    
          // Create a new task element
          function createTaskElement(task) {
            const taskList = document.getElementById("taskList");
            const li = document.createElement("li");
            li.textContent = task;
            li.onclick = () => toggleTaskCompletion(li);
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.onclick = () => deleteTask(li, task);
            
            li.appendChild(deleteButton);
            taskList.appendChild(li);
          }
    
          // Add a new task
          function addTask() {
            const taskInput = document.getElementById("taskInput");
            const task = taskInput.value.trim();
            if (task !== "") {
              const tasks = getTasksFromStorage();
              tasks.push(task);
              localStorage.setItem("tasks", JSON.stringify(tasks));
              createTaskElement(task);
              taskInput.value = "";
            }
          }
    
          // Toggle task completion
          function toggleTaskCompletion(taskElement) {
            taskElement.classList.toggle("completed");
            updateLocalStorage();
          }
    
          // Delete a task
          function deleteTask(taskElement, task) {
            taskElement.remove();
            const tasks = getTasksFromStorage();
            const index = tasks.indexOf(task);
            if (index > -1) {
              tasks.splice(index, 1);
              localStorage.setItem("tasks", JSON.stringify(tasks));
            }
          }
    
          // Update local storage with current tasks
          function updateLocalStorage() {
            const tasks = [];
            const taskElements = document.querySelectorAll("#taskList li");
            taskElements.forEach(taskElement => tasks.push(taskElement.textContent));
            localStorage.setItem("tasks", JSON.stringify(tasks));
          }
    
          // Load tasks when the page is loaded
          window.onload = () => {
            displayTasks();
          };
    