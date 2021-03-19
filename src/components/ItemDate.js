import React, { Component } from 'react'

class ItemDate extends Component{
    constructor(props) {
        super(props)
        this.state = {
            key: this.props.id,
            date: this.props.listItem.due_date,
            hover: false
        };
        this.viewing = false
    }

    setDate = (mv) => {
        //console.log(mv.currentTarget.value);
        let hovent = !this.state.hover;
        let currDate = mv.currentTarget.value
        this.props.changeDate(this.state.key, this.state.date, currDate);
        this.viewing = false;
        this.forceUpdate();
        this.setState({
            hover: hovent,
            date: currDate
        })
    }

    unhover = () => {
        let hover = !(this.state.hover);
        if (this.viewing) {
            return;
        }
        this.setState({
            hover: hover
        })
    }

    render() {
        let listen = this.state.hover;
        if (listen) {
            return (
                <div
                    className = 'item-col due-date-col'
                    onMouseLeave = {this.unhover}
                >
                <input type ="date" onChange={this.setDate} onClick={() => {this.viewing = true}} value = {this.props.listItem.due_date.toString()} />
                </div>
            )
        }
        else {
            return(
                <div
                    className = 'item-col due-date-col'
                    onMouseOver = {this.unhover}
                >
                {this.props.listItem.due_date}
                </div>
            )
        }
    }
}
export default ItemDate