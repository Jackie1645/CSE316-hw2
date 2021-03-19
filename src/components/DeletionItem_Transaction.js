'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(id, task, dueDate, status, state) {
        super();
        this.id = id;
        this.task = task;
        this.dueDate = dueDate;
        this.status = status;
        this.state = state;
    }

    doTransaction() {
        console.log(this.id);
        let currItems = this.state.currentList.items.filter(item => item.id != this.id);
        console.log(currItems);
        let newCurrList = this.state.toDoLists;
        newCurrList.items = currItems;

        this.state.currentList.items = currItems;
        console.log(this.state.currentList.items);
        //this.state.currentList = currItems;
    }

    undoTransaction() {
        this.state.currentList.items.push({
            id: this.id,
            description: this.task,
            due_date: this.dueDate,
            status: this.status
        })
    }
}