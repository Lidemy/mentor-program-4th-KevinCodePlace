import { render } from '@testing-library/react'
import React, {Component} from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'

class TodoApp extends Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            status: ''
        }
    }

    handleSubmitComment(todo) {
        if(!todo) return
        if(!todo.content) return alert('請輸入待辦事項')
        this.state.todos.push(todo)
        this.setState({
            todos: this.state.todos
        })
    }

    handleDeleteAll() {
        const todos = []
        this.setState({
            todos
        })
    }

    handleDeleteTodo(index) {
        const todos = this.state.todos
        todos.splice(index, 1)
        this.setState({ todos })
    }

    handleTodoFinished(index) {
        const todos = this.state.todos
        todos[index].isFinished = !this.state.todos[index].isFinished
        this.setState({
            todos
        })
    }

    handleFilterComment (status) {
        this.setState({
            status
        })
    }

    render() {
        return(
            <div className='wrapper'>
                <TodoInput 
                    onKeyDown={this.handleSubmitComment.bind(this)} 
                    onDeleteAll={this.handleDeleteAll.bind(this)}/>
                <TodoList 
                    todos={this.state.todos}
                    status={this.state.status}
                    onDeleteTodo={this.handleDeleteTodo.bind(this)}
                    onCheckTodoFinished={this.handleTodoFinished.bind(this)}/>
                <TodoFilter 
                    onFilterComment={this.handleFilterComment.bind(this)}/>
            </div>
        )
    }
}

export default TodoApp
