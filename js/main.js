const input =document.querySelector(".input");
const add =document.querySelector(".add");
const tasksDiv =document.querySelector(".tasks");

let Tasksarry =[];
//Checke if Theres Tasks on Storage
if (localStorage.getItem("Tasks")) {
    Tasksarry=JSON.parse(localStorage.getItem("Tasks"))
}
getdataFromStorage();
// Add Task
add.addEventListener("click",()=>{
if(input.value != ""){
    addtaskstoarry(input.value);
    input.value="" // Empty the input Field

}
});
// Click on Tske Element
tasksDiv.addEventListener("click",(e)=>{
    //Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id")); 
        //Remove Element from The Page
        e.target.parentElement.remove();
    }
    // Task Element
  if (e.target.classList.contains("task")) {
     // Toggle Completed For The Task
     toggleStatusTaskWith(e.target.getAttribute("data-id"));
     // Toggle Done Class
     e.target.classList.toggle("done");

  }
    
})
//add tasks to array
function addtaskstoarry(inputtext){
// taske data 
const task={
    id: Date.now(),
    title:inputtext,
    completed:false
}
// push tasks to array
Tasksarry.push(task);
//Add Tasks To Page
AddtasktopageFrom(Tasksarry)
// add Tasks to LocalStorage
addtoStorage(Tasksarry);
};

//Add Element To Page
function AddtasktopageFrom(Tasksarry) {
    //Empty Tasks Div
    tasksDiv.innerHTML="";
    //Loop On Array Of Tasks
    Tasksarry.forEach(task => {
        //Create Main div
        let div = document.createElement("div");
        div.className= "task";
        //Checke if task Done
        if (task.completed) {
            div.className= "task done";
            
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        //Create button Delete
       let span =document.createElement("span");
       span.className= "del";
       span.appendChild(document.createTextNode("Delete"));
       div.appendChild(span)
       //append div to tasks div
       tasksDiv.appendChild(div)
    });
}

//add Data To LocalStorage
function addtoStorage(Tasksarry){
   localStorage.setItem("Tasks",JSON.stringify(Tasksarry));
   }

function getdataFromStorage(){
    let data = localStorage.getItem("Tasks");
    if (data) {
        let stortasks = JSON.parse(data);
        AddtasktopageFrom(stortasks)
    }
}
 
function deleteTaskWith(tasksid){
    //Filtering Data 
   Tasksarry=Tasksarry.filter((task)=>task.id != tasksid)
   addtoStorage(Tasksarry);
}


function  toggleStatusTaskWith(tasksid){
Tasksarry.map(task=>{
    if (task.id ==tasksid) {
        task.completed ==false? task.completed =true: task.completed =false;
    }
    addtoStorage(Tasksarry);

})
}