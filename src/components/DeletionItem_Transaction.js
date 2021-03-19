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
        this.position = null;
        this.pos = null;
        this.curr = null;
    }

    doTransaction() {
        for (let i = 0; i < this.state.currentList.items.length; i++) {
            if (this.state.currentList.items[i].id == this.id) {
                this.position = i;
                break;
            }
        }
        
        let currItems = this.state.currentList.items.filter(item => item.id != this.id);
        console.log(currItems);
        let newCurrList = this.state.toDoLists;
        newCurrList.items = currItems;

        this.state.currentList.items = currItems;
        console.log(this.state.currentList.items);
        //this.state.currentList = currItems;
    }

    undoTransaction() {
        console.log(this.task);
        console.log(this.dueDate);
        console.log(this.status);
        console.log(this.position);
        this.state.currentList.items.push({
            id: this.id,
            description: this.task,
            due_date: this.dueDate,
            status: this.status
        })
        for (let i = 0; i < this.state.currentList.items.length; i++) {
            if (this.state.currentList.items[i].id == this.id) {
                this.curr = i;
            }
        }

        while (this.position > this.curr) {
            this.pos = this.state.currentList.items.map((ker) => ker.id == this.id).indexOf(true);
            let first = this.state.currentList.items.slice(0, this.pos - 1);
            let back = this.state.currentList.items.slice(this.pos + 1);
            
            this.state.currentList.items = first.concat(this.state.currentList.items[this.pos]).concat(this.state.currentList.items[this.pos - 1]).concat(back);
            this.curr += 1;
        }
        console.log(this.curr);
    }
}