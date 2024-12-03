let inputText = document.getElementById("input-text");
let plusButton = document.getElementById("plus-button");
let task_List=[];
// 처음은 모든일을 보여줘야되기 때문에
let whichTab = 'all-task';
let which_List=[];
let underLine = document.getElementById("under-line")
let tabsButton = document.querySelectorAll('.tabs-area div')
let deleteAll = document.getElementById("delete-all");
plusButton.addEventListener("click", plus);
deleteAll.addEventListener("click", deleteAllContent);

// enter키 입력했을 시도 가능
inputText.addEventListener("keydown", function (event) {
  if (event.key === "Enter") { // Enter 키 확인
    plus(); // plus 함수 호출
  }
});

// 마우스 focus시 안되게끔
// inputText.addEventListener("focus", function(){
//   inputText.value = "";
// });

tabsButton.forEach(menu=>menu.addEventListener("click",(e)=>underlineIndicator(e)))
function underlineIndicator(e){
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}


for(let i=1;i<tabsButton.length;i++){
  tabsButton[i].addEventListener("click",function(event){
    tabsChoice(event);
  });
}
// console.log(tabsButton);


// plus-button을 눌렀을 때, 작동됨
function plus(){
  // console.log("잘 작동됩니다.");
  if(inputText.value.trim() === ""){
    alert("할 일을 입력해주세요! 😘");
    return ;
  }

  let tasks = {
    id : generateRandomID(),
    taskDetail : inputText.value,
    taskComplete : false,
  }
  task_List.push(tasks);
  console.log(task_List);
  // 입력이 끝난 후, input 창 비워주기
  inputText.value = "";

  // gpt한테 물어봄 ㅠ
  whichTab = 'all-task';
  const allTab = document.getElementById('all-task');
  tabsChoice({ target: allTab }); // 모두 탭으로 전환
  underlineIndicator({ currentTarget: allTab }); // Underline 이동
  // inner();
}

function inner(){
  let pure_list = [];
  if (whichTab === 'all-task'){
    pure_list = task_List;
  } else if(whichTab === 'ing-task'){
    pure_list = which_List;
  } else if(whichTab === 'done-task'){
    pure_list = which_List;
  }

  let contentsHTML = ''
  for(let i=0;i<pure_list.length;i++){
    if(pure_list[i].taskComplete == true){
      contentsHTML = contentsHTML + `<div id="single-area-true" id="task-${pure_list[i].id}">
      <div class="task-check">${pure_list[i].taskDetail}</div>
      <div>
        <button onclick="taskCheckButton('${pure_list[i].id}')" id="check-button"><i class="fa-solid fa-reply"></i></i></button>
        <button onclick="taskDeleteButton('${pure_list[i].id}')" id="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`
    }else{
      contentsHTML = contentsHTML + `<div id="single-area">
      <div class="task-content">${pure_list[i].taskDetail}</div>
      <div>
        <button onclick="taskCheckButton('${pure_list[i].id}')" id="check-button"><i class="fa-solid fa-check"></i></button>
        <button onclick="taskDeleteButton('${pure_list[i].id}')" id="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`
    }
  }
  document.getElementById("task-area").innerHTML = contentsHTML;
}

function taskCheckButton(id){
  for(let i=0;i<task_List.length;i++){
    if(task_List[i].id == id){
      task_List[i].taskComplete = !task_List[i].taskComplete;
      break;
    }
  }
  inner();
}


function taskDeleteButton(id){
  // console.log(id)
  for(let i=0;i<task_List.length;i++){
    if(task_List[i].id == id){
      task_List.splice(i,1);
      break;
    }
  }

  which_List = [];
  if (whichTab === "ing-task"){
    for(i=0;i<task_List.length;i++){
      if(task_List[i].taskComplete == false){
        which_List.push(task_List[i]);
      };
    };
  } else if(whichTab === "done-task"){
    for(i=0;i<task_List.length;i++){
      if(task_List[i].taskComplete == true){
        which_List.push(task_List[i]);
      };
    };
  };
  inner();
}


function tabsChoice(event){
  // console.log(event.target.id);
  whichTab = event.target.id;
  which_List = [];
  if (whichTab === 'all-task'){
    inner();
  } else if(whichTab === 'ing-task'){
    for(let i=0;i<task_List.length;i++){
      if(task_List[i].taskComplete == false){
        which_List.push(task_List[i]);
      }
    };
    inner();
  } else if(whichTab === 'done-task'){
    for(i=0; i<task_List.length;i++){
      if(task_List[i].taskComplete == true){
        which_List.push(task_List[i]);
      }
    };
    inner();
  }
}

function deleteAllContent(){
  if(confirm("모든 작업을 삭제하시겠습니까? 😥") == true){
    task_List = [];
    which_List=[];
    inner();
  }
}



// ID 생성 함수
function generateRandomID(){
  return Math.random().toString(36).substring(2, 10);
}