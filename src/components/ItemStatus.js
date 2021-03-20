import React, { Component } from 'react'

class ItemStatus extends Component{
    constructor(props) {
        super(props)
        this.state = {
            key: this.props.id,
            status: this.props.listItem.status,
            hover: false
        };
        this.viewing = false
    }

    setStatus = (mv) => {
        let hovent = !this.state.hover;
        let currStat = mv.currentTarget.value

        this.props.changeState(this.state.key, this.state.status, currStat);
        this.forceUpdate();

        this.viewing = false;
        this.setState({
            hover: hovent,
            status: currStat
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
        //console.log(this.state.status);
        if (listen) {
            if (this.props.listItem.status == "complete") {
                return (
                    <div
                        className = 'item-col status-col'
                        onMouseLeave = {this.unhover}
                    >
                    <select onChange={this.setStatus} onClick={() => {this.viewing = true}} name ="complete" id="status">
                        <option style={{color:'#19c8ff', fontFamily:"Consolas"}} value = "complete" selected>complete</option>
                        <option  style={{color:'rgb(255,200,25)', fontFamily:"Consolas"}} value = "incomplete">incomplete</option>
                    </select>
                    </div>
                )
            }
            else {
                return (
                    <div
                        className = 'item-col status-col'
                        onMouseLeave = {this.unhover}
                    >
                    <select onChange={this.setStatus} onClick={() => {this.viewing = true}} name ="complete" id="status">
                        <option style={{color:'#19c8ff',fontFamily:"Consolas"}} value = "complete" >complete</option>
                        <option style={{color:'rgb(255,200,25)', fontFamily:"Consolas"}} value = "incomplete"  selected>incomplete</option>
                    </select>
                    </div>
                )
            }
        }
        else {
            if (this.props.listItem.status == "complete") {
                return(
                    <div
                        className = 'item-col status-col'
                        onMouseOver = {this.unhover}
                        style={{color:'#19c8ff'}}
                    >
                    {this.props.listItem.status}

                    </div>
                )
            }
            else {
                return(
                    <div
                        className = 'item-col status-col'
                        onMouseOver = {this.unhover}
                        style={{color:'rgb(255,200,25)'}}
                    >
                    {this.props.listItem.status}

                    </div>
                )
            }
        }
    }
}
export default ItemStatus