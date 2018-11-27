import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import Database from '../../util/Database';
import deleteIcon from '../../img/delete.png';
import checked from '../../img/checked.png';
const hash = require('object-hash');
// import {cloneState} from '../../util/CloneState';


const NoUseElements = new Set(['noteboard-button', 'noteboard-tutorial', 'noteboard-title', 'noteboard-notes', 'noteboard'])

class NoteBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "Leave a message for your family!",

            bullets: Database.getNoteboard(),

            update: true,
            delete: false,

            edit: null,

        }

        this.NoteBoard = React.createRef();
        this.checked = React.createRef();

        this.doubleClickNoUseElement = this.doubleClickNoUseElement.bind(this);
        this.clickNoUseElement = this.clickNoUseElement.bind(this);
        this.clickPlus = this.clickPlus.bind(this);
        this.clickMinus = this.clickMinus.bind(this);
        this.clickNote = this.clickNote.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.clickSave = this.clickSave.bind(this);

        this.checkedAnimation = this.checkedAnimation.bind(this);

        document.onkeyup = this.shortPath.bind(this);
    }

    /********** lifecycle *************/

    componentWillUnmount() {
        document.onkeyup = null;
    }

    /********** ref helper ************/
    scrollTop() {
        if(this.NoteBoard.current != null) {
            this.NoteBoard.current.scrollTop = 0;
        }
    }

    /********** interaction **********/

    doubleClickNoUseElement(e) {
        // if double click in useful element
        if(!NoUseElements.has(e.target.className)) {
            return ;
        }

        this.cloneState = {...this.state};
        this.createEdit();

        this.setState(this.cloneState, this.scrollTop);
    }


    clickNoUseElement(e) {
        // if click in useful element
        if(!NoUseElements.has(e.target.className)) {
            return ;
        }
        this.cloneState = {...this.state};

        this.saveEdit();
        this.exitDeleteMode();

        this.setState(this.cloneState);

    }


    clickPlus(e) {
        this.cloneState = {...this.state};

        this.createEdit();

        this.setState(this.cloneState, this.scrollTop);
    }

    clickMinus(e) {

        this.cloneState = {...this.state};

        this.switchDeleteMode();

        this.setState(this.cloneState);
    }

    clickNote(e, i) {
        return (function() {

            this.cloneState = {...this.state};

            this.enterEdit(e);

            this.setState(this.cloneState);
        }).bind(this);
    }

    changeNote(e, i) {
        return (function(event) {

            this.cloneState = {...this.state};

            this.updateEdit(event, i)

            this.setState(this.cloneState);

        }).bind(this);
    }

    clickSave() {
        this.cloneState = {...this.state};
        this.saveEdit();
        this.setState(this.cloneState);
    }

    clickDelete(e, i) {
        return (function() {
            this.cloneState = {...this.state};
            this.deleteEdit(i);
            this.setState(this.cloneState);
        }).bind(this)

    }

    shortPath(e) {

        this.cloneState = {...this.state};

        if(e.ctrlKey && e.which == 83) {
            this.saveEdit();
        } else if(e.ctrlKey && e.which == 13) {
            this.createEdit();
        }

        this.setState(this.cloneState);
    }



    /********** editor **********/
    createEdit() {
        this.exitDeleteMode();
        this.saveEdit();

        const newBullet = new Note();
        this.cloneState.bullets.unshift(newBullet);
        this.cloneState.edit = newBullet;
    }

    enterEdit(e) {
        this.exitDeleteMode();

        this.cloneState.edit = e;
    }

    saveEdit() {
        if(this.cloneState.edit != null) {
            if( this.cloneState.bullets[0] &&
                this.cloneState.bullets[0].first &&
                this.cloneState.bullets[0].text.length == 0) {

                this.cloneState.bullets.shift();

            } else {
                window.requestAnimationFrame(this.checkedAnimation)
            }
            this.cloneState.edit = null;
        }

    }

    deleteEdit(i) {
        this.cloneState.bullets.splice(i, 1);
        Database.setNoteboard(this.cloneState.bullets);
    }

    updateEdit(e, i) {
        this.cloneState.bullets[i].text = e.target.value;
        this.cloneState.bullets[i].first = false;

        Database.setNoteboard(this.cloneState.bullets);
    }

    /***********  delete **********/
    switchDeleteMode() {
        this.saveEdit();
        this.cloneState.delete = !this.cloneState.delete;
    }

    exitDeleteMode() {
        this.cloneState.delete = false;
    }

    /************ Aniamtion *************/
    checkedAnimation(timestamp) {
        if (!this.start) {
            this.start = timestamp;
        }

        const progress = timestamp - this.start;
        const point = 300;
        if (progress < point) {
            this.checked.current.style.opacity = `${progress/point}`
        } else {
            this.checked.current.style.opacity = `${(800 - progress) / point}`
        }

        if(progress > 800) {
            this.start = null;
            this.checked.current.style.opacity = '0';
        } else {
            window.requestAnimationFrame(this.checkedAnimation);
        }
    }


    /************ render notes ***********/
    renderNotes() {
        return this.state.bullets.map((e, i) => {
            return (<li className={"noteboard-note " + (this.state.delete ? "noteboard-delete" : "noteboard-normal")} key={e.id}>
                        <img
                            className='noteboard-delete-icon'
                            src={deleteIcon}
                            onClick={this.clickDelete(e, i)}/>
                        <Textarea
                            className={(this.state.edit === e? "noteboard-text" : "noteboard-passage")}
                            readOnly={this.state.edit === e? null : "readOnly"}
                            autoFocus
                            onClick={this.clickNote(e,i)}
                            onInput={this.changeNote(e,i)}
                            value={this.state.bullets[i].text}
                        />
                    </li> );
        })
    }

    render() {
        return (

            <div
                className="noteboard"
                onDoubleClick={this.doubleClickNoUseElement}
                onClick={this.clickNoUseElement}
            >
                <h3 className="noteboard-title">
                    Message Board
                    <button className='noteboard-button-icon noteboard-button-minus' onClick={this.clickMinus}> - </button>
                    <button className='noteboard-button-icon noteboard-button-plus' onClick={this.clickPlus}> + </button>
                </h3>

                <ul className="noteboard-notes" ref={this.NoteBoard}>
                {
                    this.renderNotes()
                }

                {
                    this.state.bullets.length === 0 ?
                    <h3 className="noteboard-tutorial"> Double Click here Or <br/><br/> Press Ctrl + Enter<br/><br/>to start your new message <br/> </h3> : null
                }
                </ul>


                <div className="noteboard-button">
                    {/* <input className="noteboard-remove" type="submit" value="Delete" onClick={this.saveEdit}/> */}
                    <div className="notenoard-submit-img-section" ref={this.checked}>
                        <img className="notenoard-submit-img" src={checked} />
                    </div>
                    <input className="noteboard-submit center-block" type="submit" value="Save" onClick={this.clickSave}/>
                </div>
            </div>
        );
    }
}

class Note {
    constructor() {
        this.first = true;
        this.expand = false;
        this.text = "";
        this.id = Date.now() + Math.random()
    }
}

export default NoteBoard;
