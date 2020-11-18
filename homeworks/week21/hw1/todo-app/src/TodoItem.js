import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        onCheckTodoFinished: PropTypes.func,
        index: PropTypes.number
    }

    handleTodoFinished(event) {
        if(this.props.onCheckTodoFinished) {
            this.props.onCheckTodoFinished(this.props.index)
        }
    }
    

    handleDeleteTodo(event) {
        if(this.props.onDeleteTodo) {
            this.props.onDeleteTodo(this.props.index)
        }
    }

 

    render() {
        return(
            <div className='todo__List'>
                <div className='todo__check' onClick={this.handleTodoFinished.bind(this)}>{this.props.todo.isFinished ? '☑' : '☐'}</div>
                <div className='todo__item' 
                    onClick={this.handleTodoFinished.bind(this)}>
                    {this.props.todo.content}
                </div>
                <span className='todo__delete' onClick={this.handleDeleteTodo.bind(this)}>X</span>
            </div>
        )
    }
}

export default TodoItem