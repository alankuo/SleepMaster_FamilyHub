import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
const hash = require('object-hash');

class NoteBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "Leave a message for your family!",

            bullets: [

            ],

            update: true,
            edit: null,
        }

        this.enterEdit = this.enterEdit.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.updateEdit = this.updateEdit.bind(this);
        this.createEdit = this.createEdit.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
        this.getEntryEdit = this.getEntryEdit.bind(this);
    }


    /********** editor **********/
    getEntryEdit(e,i) {
        return this.enterEdit.bind(this, e);
    }

    enterEdit(e, event) {
        event.stopPropagation();
        this.setState({...this.state, edit: e});
    }

    saveEdit() {
        if(this.state.edit != null) {
            if(this.state.edit.text === "") {

            }
            this.setState({...this.state, edit: null});
        }

    }

    createEdit() {
        const newBullet = new Note();
        this.state.bullets.push(newBullet);
        this.setState({...this.state, bullets: this.state.bullets, edit: newBullet});
    }

    updateEdit(e) {

        // this.setState({...this.state, })
    }

    /************ render notes ***********/
    renderNotes() {
        return this.state.bullets.map((e, i) => {
            return (<Textarea
                    key={hash(e)}
                    className={this.state.edit == e? "noteboard-text" : "noteboard-passage"}
                    autofocus="autofocus"
                    readOnly={this.state.edit == e? null : "readOnly"}
                    onClick={this.getEntryEdit(e,i)}
                    onChange={this.updateEdit}

                /> );
        })
    }

    render() {
        return (

            <div
                className="noteboard"
                onDoubleClick={this.createEdit}
            >
                <h3 className="noteboard-title"> Message Board</h3>
                <div className="noteboard-notes">
                {
                    this.renderNotes()
                }

                {
                    this.state.bullets.length == 0 ?
                    <h3 className="noteboard-tutorial"> Double Click here<br/>to start your new message</h3> : null
                }
                </div>


                <div className="noteboard-button">
                    {/* <input className="noteboard-remove" type="submit" value="Delete" onClick={this.saveEdit}/> */}
                    <input className="noteboard-submit" type="submit" value="Save" onClick={this.saveEdit}/>
                </div>
            </div>
        );
    }
}

class Note {
    constructor() {
        this.edit = false;
        this.expand = false;
        this.text = "";
    }
}

export default NoteBoard;