'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class addItem_Transaction extends jsTPS_Transaction {
    constructor(id, task, dueDate, status, state) {
        super();
        this.id = id;
        this.task = task;
        this.dueDate = dueDate;
        this.status = status;
        this.state = state;
    }

    doTransaction() {
        this.state.currentList.items.push({
            id: this.id,
            description: this.task,
            due_date: this.dueDate,
            status: this.status
        })
    }

    undoTransaction() {
        let filter  = this.state.currentList.items.filter((curr) => 
            curr.id != this.id
        );
        this.state.currentList.items = filter;
    }
}