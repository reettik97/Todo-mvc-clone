var state = [];
//Array of object
//  obj.task  =  task
//  obj.task_done = false;(default)
//  obj.id = state_index


let ul = document.createElement('ul');
let take_input = document.querySelector("input");


let state_index = -1;


function ItemLeft(state){
   return state.reduce((acc , obj) =>{
       if(obj.task_done==false){
           acc++;
       }
       return acc;
   },acc=0)
}

function clearDoneTask(){
     state = state.filter(obj => !(obj.task_done) );
     view_task(state);
    }
// create footer
let footer = document.createElement("footer");
function createFooter(){
  footer.innerHTML ='';
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
   }
   else{
    clearComplete.style.visibility = "hidden"; 
   }
  

   clearComplete.addEventListener('click' ,clearDoneTask );



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


//remove the task from the array  //done
function remove_task(event) {
    console.log()
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

function view_task(state = []) // dislay the table of todo lists
{
    ul.innerHTML = ""; // remove the contents of ul 
    state.forEach(todos => {

        //create the elements
        let li = document.createElement('li');

        // let div = document.createElement('div');


        let img = document.createElement('img')
        let input = document.createElement('input');
        let label = document.createElement('label');

        label.setAttribute("data-key", todos.id);
        label.for = todos.id;


        let p = document.createElement('p');
        let span = document.createElement('span');

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

        //append to ul element 


        // console.log("todos "  + state[todos.id].task_done);
        if (input.checked == true) {
            p.style.textDecoration = "line-through"
            img.style.opacity = ".3";
            p.style.color = "#d9d9d9";


        } else {
            p.style.textDecoration = "none";
            img.style.opacity = "0";

        }


        // create footer
        
        createFooter();



        li.append(label, input, p, span);
        ul.appendChild(li);

        //add events of the elements
        p.addEventListener("dblclick", edit_todo_text);
        span.addEventListener("click", remove_task)
        label.addEventListener("click", check_todo);
    })
    document.querySelector("#push-task").appendChild(ul);;
}


function add_task(event) // take the input and the add into the array 
{
    if (event.code == "Enter") {
        let obj = {};
        obj.task = event.target.value.trim(); // add a proper tasks style
        obj.task_done = false;
        obj.id = ++state_index;
        state = state.concat(obj);
        view_task(state);
        event.target.value = '';
    }
}

// function all_events(event){

//      if(event.target.nodeName == "P"){
//          console.log('p');
//      }
//      if(event.target.nodeName = "INPUT"){
//          console.log(event);

//     }
//     if(event.target.nodeName == "SPAN"){   // remove from the database; 
//       state = state.filter(li => !(event.target.parentElement.dataset.id==li.id)); 
//       view_task(state);
//     }
// }


take_input.addEventListener('keyup', add_task);


// ul.addEventListener('click' , all_events);





// let take_input = document.querySelector('input');

// let ul = document.createElement('ul'); 
// document.querySelector('#push-task').appendChild(ul);
// //create a one time ul 


// function add_task(e){
// //in function add_task we add the tasks
//    if(e.keyCode == 13){
//    let task_to_add = e.target.value;

//    let li = document.createElement('li');
//    let input_checkbox = document.createElement('input');
//    input_checkbox.type = 'checkbox';
//    let p  = document.createElement('p');
//    let span = document.createElement('span');

//  //create the task table
//    ul.appendChild(li);
//    li.appendChild(input_checkbox)
//    p.textContent = task_to_add;
//    span.innerHTML = "&#10005;"
//    li.appendChild(p);
//    li.appendChild(span);
//    li.classList.add("flex" ,"task_box");
//    p.classList.add('task'); 

//    e.target.value = ''; //remove the input text

//    //remove the task
//    span.addEventListener("click" ,remove_task =>{
//        span.parentElement.remove();
//    });



//    //if the task done line through it
//    input_checkbox.addEventListener('change' ,function(){
//        if(this.checked){
//            p.style.textDecoration = 'line-through';
//        }else{
//            p.style.textDecoration = 'none';
//        }
//    });


//    function edit(event){
//        let create_input = document.createElement('input') ;
//        let parentElement = p.parentElement;

//         // parentElement.re 



//     //    console.log(parentElement);          
//    }

//    p.addEventListener("click" , edit);



//    //edit the task
//     // p.addEventListener("click" , function(){

//     //     var li_parent_element = p.parentElement;
//     //     var create_new_input = document.createElement('input');


//     //     li_parent_element.childNodes[1].remove();
//     //     li_parent_element.childNodes[1].remove();

//     //     create_new_input.classList.add('input');
//     //     create_new_input.style.width = '90%';
//     //     // create_new_input.style.height = '100%';

//     //      create_new_input.addEventListener('keydown' , function(e){
//     //          if(e.keyCode == 13 ){
//     //             let task_to_add = e.target.value; 


//     //             let p  = document.createElement('p');
//     //             let span = document.createElement('span');

//     //             p.textContent = task_to_add;
//     //             span.innerHTML = "&#10006;"
//     //             li_parent_element.appendChild(p);
//     //             li_parent_element.appendChild(span);
//     //             li_parent_element.classList.add("flex" ,"task_box");
//     //             p.classList.add('task'); 

//     //             e.target.value = '';
//     //          }
//     //      })

//     //      li_parent_element.appendChild(create_new_input);

//         // console.log( );
//     // });





//    //  2nd try








//    }



// }

// take_input.addEventListener("keydown" ,   add_task);