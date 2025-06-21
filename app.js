const form = document.querySelector("form");
const todoListUL = document.querySelector("#todo-list");
const inputTask = document.querySelector("#todo-input");
let todoArray = gettodos();
updateElement();
console.log(todoArray);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addTask();
})

function addTask(){
    const task = inputTask.value.trim();
    if(task.length > 0){
         const todoObj ={
            text : task,
            compeleted : false,
        }
        todoArray.push(todoObj);
        updateElement();
        savetodo();
        inputTask.value = '';
    }
}

function updateElement(){
    todoListUL.innerHTML = "";
    todoArray.forEach((eachTask, index) => {
       const returnedTask = createLiElement(eachTask, index); 
       todoListUL.append(returnedTask);  
    });
}

function createLiElement(task, i){
    const todoIndex = "todo-"+ i;
    const todoTask = document.createElement('li');
    const todoText = task.text;
    console.log(todoText);
    
    todoTask.className="todo";
    todoTask.innerHTML = `
        <input type="checkbox" id= "${todoIndex}" autocomplete="off" >
                <label for="${todoIndex}">
                    <img src="./icons/checked.png" alt="" class="img-check">
                </label>
                <label for="${todoIndex}" class="todo-text"> ${todoText}</label>
                <button><img src="./icons/bin.png" alt="trashbin" class="img-bin" ></button>
                </li>
    `
    const trashbin = todoTask.querySelector(".img-bin");
    trashbin.addEventListener("click", ()=>{
        deleteLI(task, i);
    });
    const checkbox = todoTask.querySelector("input");
    checkbox.addEventListener("change", () => {
        todoArray[i].compeleted = checkbox.checked;
        savetodo();
        
    })
    checkbox.checked = task.compeleted;
    return todoTask;
}

function deleteLI(task, i){
    todoArray = todoArray.filter((value, index) => {
        return i !== index;
    })
    savetodo();
    updateElement();
}

function savetodo(){
    const allTodos = JSON.stringify(todoArray);
    localStorage.setItem("todoStorage", allTodos);
}
function gettodos(){
    const getArray = localStorage.getItem("todoStorage") || "[]";
    return JSON.parse(getArray);
}






