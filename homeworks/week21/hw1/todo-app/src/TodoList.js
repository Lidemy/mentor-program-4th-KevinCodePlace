import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

class TodoList extends Component {
    static propTypes = {
        todos: PropTypes.array,
        status: PropTypes.string,
        onDeleteComment: PropTypes.func,
        onCheckCommentFinished: PropTypes.func
    }

    static defaultProps = {
        todos : []
    }

    handleTodoFinished (index) {
        if(this.props.onCheckTodoFinished) {
            this.props.onCheckTodoFinished(index)
        }
    }

    handleDeleteTodo (index) {
        if(this.props.onDeleteTodo) {
            this.props.onDeleteTodo(index)
        }
    }
    
    render() {
        return(
            <div>
                {this.props.todos.filter((todo) => {
                    if (this.props.status === 'all' || this.props.status ==='') return todo
                    if (this.props.status === 'finished') return todo.isFinished === true
                    if (this.props.status === 'unfinished') return todo.isFinished === false
                }).map((todo, i) => 
                    <TodoItem 
                        todo={todo} 
                        key={i}
                        index={i}
                        onDeleteTodo={this.handleDeleteTodo.bind(this)}
                        onCheckTodoFinished={this.handleTodoFinished.bind(this)}/>
                )}       
            </div>
        )
    }
}

export default TodoList

