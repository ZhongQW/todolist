import React, { Component } from 'react';
import './App.css';
import Content from './component/Content';
import Footer from './component/Footer';

class App extends Component {
  constructor(){
      super();
      this.state = {
        todos:[],
        actTodos:[]
      };
      /*由于在子组件中不能修改父组件的状态，所以在父组件中定义，在子组件中调用*/
      this.changeTodo = this.changeTodo.bind(this);
      this.addTodo = this.addTodo.bind(this);
      this.deleteTodo = this.deleteTodo.bind(this);
      this.clearDone = this.clearDone.bind(this);
      this.handleAll = this.handleAll.bind(this);
      this.handleActive = this.handleActive.bind(this);
      this.handleComponent = this.handleComponent.bind(this);
  }

    //修改sta的状态
    changeTodo(id,sta){
      const {todos} = this.state;
      for(let i=0;i<todos.length;i++){
          if(id === i){
              todos[i].sta = sta;
          }
      }
      this.setState({todos});
  }
  //增加一个li
    addTodo(content){
      const {todos} = this.state;
      const {actTodos} = this.state;
      const todo = {
        content:content,
        sta:0
      };
      todos.push(todo);
      actTodos.push(todo);
      this.setState({todos});
      this.setState({actTodos});
    }
    //删除一个li
    deleteTodo(id){
      const {todos} = this.state;
      const {actTodos} = this.state;
      for(let i=0;i<todos.length;i++){
          if(i === id){
              todos.splice(id,1);
          }
      }
      for(let i=0;i<actTodos.length;i++){
          if(i === id){
              actTodos.splice(id,1);
          }
      }
        this.setState({todos});
    }
    //点击all
    handleAll(){
      const {todos} = this.state;
      let {actTodos} = this.state;
      actTodos.length = 0;
        for(let i=0;i<todos.length;i++){
            actTodos.push(todos[i]);
        }
      this.setState({actTodos});
    }
    //点击active
    handleActive(){ //将筛选后的actTodos返回给子组件
        let {todos} = this.state;
        let {actTodos} = this.state;
        actTodos.length = 0;
        for(let i=0;i<todos.length;i++){
            if(todos[i].sta === 0) {
                actTodos.push(todos[i]); //将sta为0的元素赋值给actTodos
            }
        }
        this.setState({actTodos});
    }
    //点击componented
     handleComponent() {
         let {todos} = this.state;
         let {actTodos} = this.state;
         actTodos.length = 0; //清空actTodos
         for (let i = 0; i < todos.length; i++) {
             if (todos[i].sta === 1) {
                 actTodos.push(todos[i]); //将sta为1的元素赋值给actTodos
             }
         }
         this.setState({actTodos});
     }
    //点击clear
    clearDone(){
        let {todos} = this.state;
        let {actTodos} = this.state;

        todos = todos.filter(function(todo){
            return todo.sta === 0;
        });
        actTodos = actTodos.filter(function(todo){
            return todo.sta === 0;
        });

        this.setState({todos});
        this.setState({actTodos});
    }

  render(){
      const {actTodos} = this.state;
      const {todos} = this.state;
      let count = 0;
      for(let i=0;i<todos.length;i++){
            if(todos[i].sta === 0){
                count++;
            }
      }
      return (
        <div id = "back">
          <Content todos = {actTodos} addTodo = {this.addTodo} changeTodo = {this.changeTodo} deleteTodo = {this.deleteTodo}/>
          <Footer
                  count = {count}
                  handleAll ={this.handleAll}
                  handleActive ={this.handleActive}
                  handleComponent ={this.handleComponent}
                  todos = {actTodos}
                  clearDone = {this.clearDone}
                  addTodo = {this.addTodo}
                  changeTodo = {this.changeTodo}
                  deleteTodo = {this.deleteTodo}
          />
        </div>
    );
  }
}


export default App;
