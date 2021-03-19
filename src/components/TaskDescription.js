import React, { Component } from 'react'

class TaskDescription extends Component{
    constructor(props) {
        super(props)
        this.state = {
            key: this.props.id,
            desc: this.props.listItem.description,
            hover: false
        };
    }

    setDescription = (mv) => {
        let describ = mv.target.innerText;
        this.props.changeDesc(this.state.key, this.state.desc, describ);
        let hovent = !this.state.hover;
        this.forceUpdate();
        this.setState({
            hover: hovent
        })
    }

    render() {
        let description = this.state.desc;
        let listen = this.state.hover;
        if (listen) {
            return (
                <div
                    className = 'item-col task-col'
                    contentEditable='true'
                    onBlur={this.setDescription}
                >
                {this.props.listItem.description}
                </div>
            )
        }
        else {
            return(
            <div
                    className = 'item-col task-col'
                    onMouseOver={this.setDescription}
                >
                {this.props.listItem.description}
                </div>
            )
        }
    }
}

export default TaskDescription