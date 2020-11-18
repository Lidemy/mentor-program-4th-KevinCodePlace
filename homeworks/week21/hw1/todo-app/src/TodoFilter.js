import React, {Component} from 'react'

class TodoFilter extends Component {
    constructor() {
        super()
        this.state = {
            allActive: true,
            finishedActive: false,
            unfinishedActive:false
        }
    }

    handleChangeActive (event) {
        let allActive = this.state.allActive
        let finishedActive = this.state.finishedActive
        let unfinishedActive = this.state.unfinishedActive
        if(event.target.innerText === '全選') {
            allActive = true
            finishedActive = false
            unfinishedActive = false
            this.props.onFilterComment('all')
        }
        if(event.target.innerText === '已完成') {
            allActive = false
            finishedActive = true
            unfinishedActive = false
            this.props.onFilterComment('finished')
        }
        if(event.target.innerText === '未完成') {
            allActive = false
            finishedActive = false
            unfinishedActive = true
            this.props.onFilterComment('unfinished')
        }
        this.setState({
            allActive,
            finishedActive,
            unfinishedActive
        })
        
    }

    render() {
        return(
            <div>
                <div className='todo__filters'>
                    <div className='todo__filter'>選擇狀態：</div>
                    <div className={`todo__filter todo__filter_bg  ${this.state.allActive ? 'active' : ""}`}
                        onClick={this.handleChangeActive.bind(this)}>
                        全選
                    </div>
                    <div className={`todo__filter todo__filter_bg  ${this.state.finishedActive ? 'active' : ""}`}
                        onClick={this.handleChangeActive.bind(this)}>
                        已完成
                    </div>
                    <div className={`todo__filter todo__filter_bg  ${this.state.unfinishedActive ? 'active' : ""}`}
                        onClick={this.handleChangeActive.bind(this)}>
                        未完成
                    </div>
                </div>
            </div>          
        )
    }
}

export default TodoFilter