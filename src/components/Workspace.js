// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    
    handleNewItem = () => {
        this.props.addNewItem("No Description", "2001-01-01", "incomplete");
    }

    /*handleRemoveItem = (mv) => {
        let parent = mv.currentTarget.parentElement.parentElement;
        let id = Number.parseInt( parent.id.split("-")[parent.id.split("-").length - 1] );
        this.props.removeItem(id);
    }*/

    handleCloseList = () => {
        this.props.closeList();
    }

    handleListDeletion = () => {
        this.props.closeList();
        this.props.deleteList();
        this.forceUpdate();
    }

    handleDescChange = (id, oldDesc, newDesc) => {
        this.props.changeDesc(id, oldDesc, newDesc);
        this.forceUpdate();
    }
    
    handleDateChange = (id, oldDate, newDate) => {
        this.props.changeDate(id, oldDate, newDate);
        this.forceUpdate();
    }

    handleStateChange = (id, oldState, newState) => {
        this.props.changeStatus(id, oldState, newState);
        this.forceUpdate();
    }

    handleItemUp = (id) => {
        this.props.itemUp(id);
        this.forceUpdate();
    }

    handleItemDown = (id) => {
        this.props.itemDown(id);
        this.forceUpdate();
    }

    handleDeleteItem = (id, task, date, status) => {
        this.props.removeItem(id, task, date, status);
        this.forceUpdate();
    }

    render() {
        //console.log(this.props.toDoListItems);
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo 
                            id="undo-button" 
                            className="list-item-control material-icons todo-button" 
                            style={!this.props.hasUndo ? {color:'rgb(144,144,144)'}: {color:''}}
                            onClick = {this.props.undo}/>
                        <Redo 
                            id="redo-button" 
                            className="list-item-control material-icons todo-button"
                            style={!this.props.hasRedo ? {color:'rgb(144,144,144)'}: {color:''}}
                            onClick = {this.props.redo}/>
                        <AddBox 
                            id="add-item-button" 
                            className="list-item-control material-icons todo-button"
                            style={!this.props.listOpen ? {color:'rgb(144,144,144)'}: {color:''}}
                            onClick = {!this.props.listOpen ? {} : this.handleNewItem}/>
                        <Delete 
                            id="delete-list-button" 
                            className="list-item-control material-icons todo-button"
                            style={!this.props.listOpen ? {color:'rgb(144,144,144)'}: {color:''}}
                            onClick = {!this.props.listOpen ? {} : this.handleListDeletion} />
                        <Close 
                            id="close-list-button" 
                            className="list-item-control material-icons todo-button" 
                            style={!this.props.listOpen ? {color:'rgb(144,144,144)'}: {color:''}}
                            onClick={!this.props.listOpen ? {} : this.handleCloseList}/>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            deletion={this.handleDeleteItem}
                            changeDesc={this.handleDescChange}
                            changeDate={this.handleDateChange}
                            changeState={this.handleStateChange}
                            itemUp={this.handleItemUp}
                            itemDown={this.handleItemDown}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            firstItem={toDoListItem.id == this.props.toDoListItems[0].id}
                            lastItem={toDoListItem.id == this.props.toDoListItems[this.props.toDoListItems.length - 1].id}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;