window.onload = function(){
  let addItem = document.getElementById('addItem');
  let todoItem = document.getElementById('todoItems');
  let all = document.getElementById("all");
  let active = document.getElementById("active");
  let completed = document.getElementById("completed");
  let clear = document.getElementById("clear");
  let count = document.getElementById('count');
  let num = 0;

  document.onkeydown = function(event){
        if(event.keyCode === 13){
            if(addItem.value !== ''){
                let li = document.createElement('li');
                let input = document.createElement('input');
                let span = document.createElement('span');
                let del = document.createElement('span');
                span.className = 'span';
                del.className = 'del';
                del.addEventListener('click',clearItem,false);
                input.type = 'checkbox';
                input.onclick = () =>ItemChange(1);
                input.className = "checkbox";
                span.innerHTML = addItem.value;
                li.appendChild(input);
                li.appendChild(span);
                li.appendChild(del);
                todoItem.appendChild(li);
                num++;
                count.innerHTML = num;
                addItem.value = "";
        }else{
                alert('请输入内容！');
            }
        }
  };
  all.onclick = function(){
      num = countTodo();
      count.innerHTML = num;
      let lists = document.querySelectorAll('#todoItems li');
      let input = [];
      let span = [];
      for(let i=0;i<lists.length;i++) {
          input[i] = lists[i].firstChild;
          input[i].onclick = () => ItemChange(1);
          span[i] = input[i].nextSibling;
      }
      for(let i=0;i<lists.length;i++){
          if (input[i].checked) { //勾选
              span[i].className = 'deleteItem';
          }else{ //未勾选
              span[i].className = 'span';
          }
          lists[i].style.display = 'block';
      }
  };

  active.onclick = function(event){
      num = countTodo();
      count.innerHTML = num;
      let lists = document.querySelectorAll('#todoItems li input ');

      for(let i=0;i<lists.length;i++){
          lists[i].onclick = ()=>ItemChange(2);
      }
      for( let i=0;i<lists.length;i++){
          lists[i].nextSibling.className = 'span';
          if(lists[i].checked){ //已经完成的
              lists[i].parentNode.style.display = 'none';
          }else{ //未完成的
              lists[i].parentNode.style.display = 'block';
          }
      }
  };

  completed.onclick = function () {
      num = countTodo();
      count.innerHTML = num;
      let lists = document.querySelectorAll('#todoItems li input ');

      for(let i=0;i<lists.length;i++){
          lists[i].onclick = ()=>ItemChange(3);
      }
      for( let i=0;i<lists.length;i++){
          lists[i].nextSibling.className = 'deleteItem';
          if(lists[i].checked){ //已经完成的
              lists[i].parentNode.style.display = 'block';
          }else{ //未完成的
              lists[i].parentNode.style.display = 'none';
          }
      }
  };

  clear.onclick = function () {
      let lists = document.querySelectorAll('#todoItems li input');

      for (let i = 0; i < lists.length; i++) {
          if (lists[i].checked) { //已经完成的
              todoItem.removeChild(lists[i].parentNode);
          } else {
              lists[i].parentNode.style.displsy = 'block';

          }
      }
      num = countTodo();
      count.innerHTML = num;
  };

  function ItemChange (id){
      let input = event.target;
      let span = input.nextSibling;
      let li = input.parentNode;
      if(id === 1) { //all
          if (input.checked) { //勾选
          span.className = 'deleteItem';
          }else{ //未勾选
              span.className = 'span';
          }
      }else if(id === 2){ // active
          if (input.checked) { //勾选之后
              li.style.display = 'none';
          }else{
              span.className = 'span';
          }
      }else if(id === 3){ // active
          if (!input.checked) { //勾选之后
              li.style.display = 'none';
          }else{
              span.className = 'deleteItem';
          }
      }else{
          alert('未知错误');
      }
      num = countTodo();
      count.innerHTML = num;
  }

  function clearItem(e) {
      let li = e.currentTarget.parentNode;
      let input = li.getElementsByClassName('checkbox')[0];
      if (!input.checked) {
          if (num === 0) {
              num = 0;
          } else {
              num--;
              count.innerHTML = num;
          }
      }
      todoItem.removeChild(li);
  }
  function countTodo (){
      let lists = document.querySelectorAll('#todoItems li');
      let input = [];
      for(let i=0;i<lists.length;i++){
          input[i] = lists[i].firstChild;
      }
      let nu = 0;
      for(let i=0;i<input.length;i++){
          if(input[i].checked){
              nu++;
          }
      }
      return (input.length - nu);
  }};
