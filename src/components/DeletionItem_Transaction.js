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
        console.log(this.pos);

        let newItem = {
            id: this.id,
            description: this.task,
            due_date: this.dueDate,
            status: this.status
          };
          let first = this.state.currentList.items.slice(0, this.position);
          let back = this.state.currentList.items.slice(this.position);
                  
          this.state.currentList.items = first.concat(newItem).concat(back);
          
    }
}