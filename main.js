var state = [];
//Array of object
//  obj.task  =  task
//  obj.task_done = false;(default)
//  obj.id = state_index
let state_index = -1;

let ul = document.createElement('ul');
let footer = document.createElement("footer");
let take_input = document.querySelector("input");


function ItemLeft(state){
   return state.reduce((acc , obj) =>{
       if(obj.task_done==false){
           acc+=1;
       }
       return acc;
   },acc=0)
}

//done
function clearDoneTask(){
     state = state.filter(obj => !(obj.task_done) );
     view_task(state);
}

// create footer
function createFooter(){
  footer.innerHTML =''; //remove the previous task

  //create elements
  let itemLeft = document.createElement("p");
  let div = document.createElement("div");
  let btnAll = document.createElement("button");
  let btnActive = document.createElement("button");
  let btnComplete = document.createElement("button");
  let clearComplete = document.createElement("p");
 
  //add class
  itemLeft.classList.add('item');
  div.classList.add("btns");
  btnAll.classList.add('all_btn');
  btnActive.classList.add('active_btn');
  btnComplete.classList.add('completed_btn');
  clearComplete.classList.add("clear-completed");
   
  

  //insert value
  itemLeft.textContent = String(ItemLeft(state)) + " items left";
  clearComplete.textContent = "Clear Completed";
   
   if(ItemLeft(state) < state.length){
       clearComplete.style.visibility = "visible"
   }else{
    clearComplete.style.visibility = "hidden"; 
   }
   
   //add events
   clearComplete.addEventListener('click' ,clearDoneTask );
//    btnAll.
//    btnActive.
//    btnComplete.


  //append child
  div.append(btnAll ,btnActive ,clearComplete );
  footer.append(itemLeft , div ,clearComplete)
  document.querySelector('.container').append(footer);

  return;
}


//edit the task   
function edit_todo_text(event) {
    console.log("dbl click");
}


//remove the task from the array  
function remove_task(event) {
    state = state.filter(li => !(event.target.parentElement.dataset.id == li.id));
    view_task(state);
}

//change the state of check /uncheck  //done
function check_todo(event) {
    state = state.map(co => {
        if (co.id == event.target.parentElement.dataset.key) {
            co.task_done = !co.task_done;
        }
        return co;
    })
    view_task(state);
}

// dislay the table of todo /lists
function view_task(state = []) 
{
    ul.innerHTML = ""; // remove the contents of ul 
    state.forEach(todos => {

        //create the elements
        let li = document.createElement('li');
        let img = document.createElement('img')
        let input = document.createElement('input');
        let label = document.createElement('label');
        let p = document.createElement('p');
        let span = document.createElement('span');
         

        label.setAttribute("data-key", todos.id);
        label.for = todos.id;


       

        //insert the values
        li.setAttribute("data-id", todos.id); // learn about more
        img.classList.add("position");
        img.src = "./done-24px.svg";
        label.appendChild(img);
        input.type = 'checkbox';
        input.id = todos.id; //  input id if label
        input.checked = todos.task_done;
        p.textContent = todos.task;
        span.innerHTML = '&#10005;';


        // insert the classes
        li.classList.add("flex", "task_box");
        label.classList.add("circle");
        input.classList.add("checkbox");
        p.classList.add("task");

        if (input.checked == true) {
            p.style.textDecoration = "line-through"
            img.style.opacity = ".3";
            p.style.color = "#d9d9d9";
        }else{
            p.style.textDecoration = "none";
            img.style.opacity = "0";
        }

        //append the child of the elements
        li.append(label, input, p, span);
        ul.appendChild(li);
               
        //add events of the elements
        p.addEventListener("dblclick", edit_todo_text);
        span.addEventListener("click", remove_task)
        label.addEventListener("click", check_todo);
        
        //create footer
        createFooter();
    })

    document.querySelector("#push-task").appendChild(ul);;
}


function add_task(event) // take the input and the add into the array 
{
    if (event.code == "Enter" && event.target.value.trim()!='') {
        let obj = {};
        obj.task = event.target.value.trim(); 
        obj.task_done = false;
        obj.id = ++state_index;
        state = state.concat(obj);
        view_task(state);
        event.target.value = '';
    }
}

take_input.addEventListener('keyup', add_task);
