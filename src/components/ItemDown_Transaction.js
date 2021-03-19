'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ItemUp_Transaction extends jsTPS_Transaction {
    constructor(id, state) {
        super();
        this.id = id;
        this.state = state;
        this.pos = null;
    }

    doTransaction() {
        this.pos = this.state.currentList.items.map((ker) => ker.id == this.id).indexOf(true);
        let first = this.state.currentList.items.slice(0, this.pos);
        let back = this.state.currentList.items.slice(this.pos + 2);
        
        this.state.currentList.items = first.concat(this.state.currentList.items[this.pos+1]).concat(this.state.currentList.items[this.pos]).concat(back);
    }

    undoTransaction() {
        //this.pos = this.state.currentList.items.map((ker) => ker.id == this.id).indexOf(true);
        let first = this.state.currentList.items.slice(0, this.pos);
        let back = this.state.currentList.items.slice(this.pos + 2);
        
        this.state.currentList.items = first.concat(this.state.currentList.items[this.pos+1]).concat(this.state.currentList.items[this.pos]).concat(back);
    }
}