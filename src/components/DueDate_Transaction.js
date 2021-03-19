'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DueDate_Transaction extends jsTPS_Transaction {
    constructor(id, oldDate, newDate, state) {
        super();
        this.oldDate = oldDate;
        this.newDate = newDate;
        this.id = id;
        this.state = state;
        this.prev = null;
        this.loc = -1;
    }

    doTransaction() {
        let currElem = this.state.currentList.items[0];
        for (let i = 0; i < this.state.currentList.items.length; i++) {
            if (this.state.currentList.items[i].id == this.id) {
                currElem = this.state.currentList.items[i];
                this.loc = i;
                break;
            }
        }
        this.prev = currElem.due_date;
        currElem.due_date = this.newDate;
        this.state.currentList.items[this.loc] = currElem;
    }


    undoTransaction() {
        this.state.currentList.items[this.loc].due_date = this.prev;
    }
}