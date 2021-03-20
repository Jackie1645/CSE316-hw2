// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import TaskDescription from './TaskDescription'
import ItemDate from './ItemDate'
import ItemStatus from './ItemStatus'

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    render() {
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        //console.log(this.props.toDoListItem);
        //console.log(this.props.firstItem);
        //console.log(this.props.lastItem);

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                <TaskDescription id = {listItem.id} listItem={listItem} changeDesc={(id, oldText, newText) => {this.props.changeDesc(id, oldText, newText); this.forceUpdate();}}/>
                <ItemDate id = {listItem.id} listItem={listItem} changeDate={(id, oldDate, newDate) => {this.props.changeDate(id, oldDate, newDate); this.forceUpdate();}}/>
                <ItemStatus id = {listItem.id} listItem={listItem} changeState={(id, oldState, newState) => {this.props.changeState(id, oldState, newState); this.forceUpdate();}}/>

                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' 
                        onClick={() => {this.props.itemUp(listItem.id);}} 
                        style={this.props.firstItem ? {color:'rgb(144,144,144)'}: {color:''}}/>
                    <KeyboardArrowDown 
                        className='list-item-control todo-button' 
                        onClick={() => {this.props.itemDown(listItem.id);}}
                        style={this.props.lastItem ? {color:'rgb(144,144,144)'}: {color:''}}/>
                    <Close className='list-item-control todo-button' 
                        onClick={() => {this.props.deletion(listItem.id, listItem.description, listItem.due_date, listItem.status); this.forceUpdate();}}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;