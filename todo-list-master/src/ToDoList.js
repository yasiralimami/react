import React, {Component} from 'react';

import ListItemInput from './ListItemInput';
import ActiveListItems from './ActiveListItems';
import FinishedListItems from './FinishedListItems';

import './react-styles.css';

class ToDoList extends Component {
    _addItemToList = () => {
        const currentListItem = this.state.currentListItem;

        if (currentListItem.length) {
            this.setState({
                ...this.state,
                currentListItem: '',
                listItems: [
                    ...this.state.listItems,
                    currentListItem
                ]
            });
        }
    };

    _setCurrentToDoListItem = (inCurrentText) => {
        this.setState({
            ...this.state,
            currentListItem: inCurrentText.target.value 
        });
    }; 

    _markItemAsFinished = (finishedItem) => {
        const currentListItems = this.state.listItems;
        const indexOfFinishedItem = currentListItems.indexOf(finishedItem.toString());

        currentListItems.splice(indexOfFinishedItem, 1);

        this.setState({
            ...this.state,
            listItems: currentListItems,
            finishedListItems: [
                ...this.state.finishedListItems,
                finishedItem
            ]
        })

    };
    _markItemAsReActive = (reActive) => {
        const currentListItems = this.state.finishedListItems;
        const indexOfListItems = currentListItems.indexOf(reActive.toString());

        currentListItems.splice(indexOfListItems, 1);

        this.setState({
            ...this.state,
            finishedListItems: currentListItems,
            listItems: [
                ...this.state.listItems,
                reActive
            ]
        })

    };

    _deleteFinishedItem = (itemToDelete) => {
        const currentFinishedListItems = this.state.finishedListItems;
        const indexOfItemToDelete = currentFinishedListItems.indexOf(itemToDelete.toString());

        currentFinishedListItems.splice(indexOfItemToDelete, 1);

        this.setState({
            ...this.state,
            finishedListItems: currentFinishedListItems
        });

    };



    constructor(props) {
        super(props);
        this.setCurrentToDoListItem = this._setCurrentToDoListItem.bind(this);
        this.addItemToList = this._addItemToList.bind(this);
        this.markItemAsFinished = this._markItemAsFinished.bind(this);
        this.markItemAsReActive = this._markItemAsReActive.bind(this);
        this.deleteFinishedItem = this._deleteFinishedItem.bind(this);
        this.state = {
            currentListItem: '',
            listItems: [],
            finishedListItems: []
        };
        
    }

    render() {
        return (
            <div>
                <h1 className="header">
                    To Do List
                </h1>
                <ListItemInput
                    className="item-input"
                    currentInput={this.state.currentListItem}
                    onTextChange={this.setCurrentToDoListItem}
                    onSubmit={this.addItemToList}
                />
                <ActiveListItems
                    className="active-items"
                    listItems={this.state.listItems}
                    onClick={this.markItemAsFinished}
                />
                <FinishedListItems
                    className="finished-items"
                    finishedListItems={this.state.finishedListItems}
                    onClick = {this.markItemAsReActive}
                    deleteFunction={this.deleteFinishedItem}
                />
            </div>
        );
    }
}

export default ToDoList;
