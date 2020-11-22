import React, {Component} from 'react'

class TodoInput extends Component {
    constructor() {
        super()
        this.state = {
            content: '',
            isFinished: false
        }
    }

    handleKeyDown(event){
        if(this.props.onKeyDown && event.which === 13) {
            const {content, isFinished} = this.state
            this.props.onKeyDown({content, isFinished})
            this.setState({content: ''})
        }
    }

    handleInputChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleDeleteAll (event) {
        if(this.props.onDeleteAll) {
            this.props.onDeleteAll()
        }
    }

    render() {
        return(
            <div className='todo__input'>
                <input type='textarea' placeholder='請輸入待辦事項（Press Enter）' value={this.state.content}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    onChange={this.handleInputChange.bind(this)}/>
                <button 
                    className='todo_deleteAll'
                    onClick={this.handleDeleteAll.bind(this)}>
                    一鍵清空
                </button>
            </div>
            
        )
    }
}

export default TodoInput