// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import addItem_Transaction from './components/addItem_Transaction'
import TaskDescription_Transaction from './components/TaskDescription_Transaction'
import DueDate_Transaction from './components/DueDate_Transaction'
import Status_Transaction from './components/Status_Transaction'
import ItemUp_Transaction from './components/ItemUp_Transaction'
import ItemDown_Transaction from './components/ItemDown_Transaction'
import DeletionItem_Transaction from './components/DeletionItem_Transaction'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("toDoLists");
    //console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      listOpen: false,
    }

    this.selectedList = -1;
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    //console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);
    
    this.selectedList = toDoList.id;
    
    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      listOpen: true
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...this.state.toDoLists, ...newToDoListInList];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1,
      listOpen: true
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date: "2000-01-01",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  addItemtoList = () => {
    let newItem = this.makeNewToDoListItem();
    this.state.currentList.items.push(newItem);
    //console.log(newItem);
    this.setState({
      nextListItemId: this.state.nextListItemId + 1,
      currentList: this.state.currentList
    }, this.afterToDoListsChangeComplete);
  }

  deleteItem = (id) => {
    let currItems = this.state.currentList.items.filter(item => item.id != id);
    let newCurrList = this.state.currentList;
    newCurrList.items = currItems;

    this.setState({
      currentList: newCurrList,
    }, this.afterToDoListsChangeComplete);
    
  }

  closeList = () => {
    this.setState({
      currentList: {items: []},
      listOpen: false
    }, this.afterToDoListsChangeComplete);
    this.tps.clearAllTransactions();
    this.forceUpdate();
  }

  addItemTransaction = (task, date, status) => {
    let trans = new addItem_Transaction(this.state.nextListItemId, task, date, status, this.state);
    this.tps.addTransaction(trans);
    this.setState({
      nextListItemId: this.state.nextListItemId + 1
    })
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  taskDescTransaction = (id, oldDesc, newDesc) => {
    let trans = new TaskDescription_Transaction(id, oldDesc, newDesc, this.state);
    this.tps.addTransaction(trans);
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }
  
  dueDateTransaction = (id, oldDate, newDate) => {
    let trans = new DueDate_Transaction(id, oldDate, newDate, this.state);
    this.tps.addTransaction(trans);
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  statusTransaction = (id, oldStatus, newStatus) => {
    let trans = new Status_Transaction(id, oldStatus, newStatus, this.state);
    this.tps.addTransaction(trans);
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  itemUpTransaction = (id) => {
    if (this.state.currentList.items[0].id == id) return;
    let trans = new ItemUp_Transaction(id, this.state);
    this.tps.addTransaction(trans);
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  itemDownTransaction = (id) => {
    if (this.state.currentList.items[this.state.currentList.items.length -1].id == id) return;
    let trans = new ItemDown_Transaction(id, this.state);
    this.tps.addTransaction(trans);
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  deleteItemTransaction = (id, task, date, status) => {
    let trans = new DeletionItem_Transaction(id, task, date, status, this.state);
    this.tps.addTransaction(trans);
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  deleteList = () => {
    console.log(this.selectedList);
    let currItems = this.state.toDoLists.filter(item => item.id != this.selectedList);
    console.log(currItems);
    let newCurrList = this.state.toDoLists;
    newCurrList = currItems;

    this.setState({
      toDoLists: newCurrList,
      listOpen: false
    }, this.afterToDoListsChangeComplete);
    this.tps.clearAllTransactions();
  }

  undo = () => {
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction();
    }
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  redo = () => {
    if (this.tps.hasTransactionToRedo()) {
      this.tps.doTransaction();
    }
    this.forceUpdate();
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString);
  }

  render() {
    let items = this.state.currentList.items;
    //console.log(this.state.toDoLists)
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          listOpen ={this.state.listOpen}
        />
        <Workspace 
          toDoListItems={items}
          addNewItem={this.addItemTransaction}
          removeItem={this.deleteItemTransaction}
          closeList={this.closeList}
          changeDesc={this.taskDescTransaction}
          changeDate={this.dueDateTransaction}
          changeStatus={this.statusTransaction}
          itemUp={this.itemUpTransaction}
          itemDown={this.itemDownTransaction}
          undo={this.undo}
          redo={this.redo}
          hasUndo={this.tps.hasTransactionToUndo()}
          hasRedo={this.tps.hasTransactionToRedo()}
          listOpen ={this.state.listOpen}
          deleteList={this.deleteList}
          />
      </div>
    );
  }
}

export default App;