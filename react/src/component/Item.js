import React,{Component} from 'react';
import '../App.css';
import PropTypes from 'prop-types';

export default class Item  extends Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
        this.delete = this.delete.bind(this);
    }

    change(index,sta) {
        if (sta === 0) { //表示未选中，点击需要选中
            this.props.changeTodo(index, 1);
            //修改当前li下的span的className
            this.refs.todoContent.className = 'deleteItem';


        } else {
            this.props.changeTodo(index, 0);
            //修改当前li下的span的className
            this.refs.todoContent.className = 'span';
        }
    }

    delete(index){
        // console.log(index);
        this.props.deleteTodo(index);
    }

    render(){
        const {content} = this.props;
        const {index} = this.props;
        const {sta} = this.props;

        return(
            <li className="li">
                <input type="checkbox" ref= "checkbox" checked={sta ? true:false} onClick = {() => {this.change(index,sta)}} className = "checkbox"/>
                <span ref = "todoContent" className ={sta ? "deleteItem":"span" }>{content}</span>
                <span className="del" onClick= {() => {this.delete(index)}} ></span>
            </li>
        )
    }
}

Item.propTypes = {
    index: PropTypes.number.isRequired,
    sta: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    changeTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};