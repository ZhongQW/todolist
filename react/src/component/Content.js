import React,{Component} from 'react';
import '../App.css';
import Item from './Item';
import PropTypes from 'prop-types';

export default class Content extends Component{
    constructor() {
        super();
        this.handelOnkeyDown = this.handelOnkeyDown.bind(this);
    }

    handelOnkeyDown(event){
        if(event.keyCode === 13){
            // console.log(this.todoInput.value);
            //子组件中不能直接改变父组件中的状态，状态在哪一个组件内，就在那个组件中改变状态
            this.props.addTodo(this.todoInput.value);
            this.todoInput.value = '';
        }
    }

    render(){
        return(
            <div id="todos">
                <h1>todos</h1>
                <input type="text"  ref = {input => this.todoInput = input} id="addItem" onKeyDown={this.handelOnkeyDown}  placeholder="What needs to be done?" autoFocus="autofocus"/>
                <ul className="ul">
                        {
                            this.props.todos.map((todo,index) => <Item key = {index} content={this.props.todos[index].content} index={index} sta={this.props.todos[index].sta} todos={todo.content} changeTodo={this.props.changeTodo} deleteTodo={this.props.deleteTodo}/>)
                        }
                </ul>
            </div>
        )
    }
}
Content.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    changeTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};