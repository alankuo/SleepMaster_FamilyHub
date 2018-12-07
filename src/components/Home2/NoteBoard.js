import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import Database from '../../util/Database';
import deleteIcon from '../../img/delete.png';
import checked from '../../img/checked.png';
const hash = require('object-hash');
// import {cloneState} from '../../util/CloneState';


const NoUseElements = new Set(['noteboard2-button', 'noteboard2-tutorial', 'noteboard2-title', 'noteboard2-notes', 'noteboard'])

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
        this.typeEnter = this.typeEnter.bind(this);

        this.doubleClickNoUseElement = this.doubleClickNoUseElement.bind(this);
        this.clickNoUseElement = this.clickNoUseElement.bind(this);
        this.clickPlus = this.clickPlus.bind(this);
        this.clickMinus = this.clickMinus.bind(this);
        this.clickNote = this.clickNote.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.clickSave = this.clickSave.bind(this);

        this.checkedAnimation = this.checkedAnimation.bind(this);

        // document.onkeyup = this.shortPath.bind(this);
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
            this.saveEdit();
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

    typeEnter(i) {
        let that = this;
        return function(e) {
            that.cloneState = {...that.state};
            let newLine = false;
            let textarea = e.target;
            let cursor;
            if(e.ctrlKey && e.which == 13) {
                console.log(e);
                cursor = e.target.selectionStart;
                newLine = true;
                that.cloneState.edit.text = that.cloneState.edit.text.substring(0,cursor) + '\n' + that.cloneState.edit.text.substring(cursor)
            } else if(e.which == 13) {
                that.saveEdit();
                e.preventDefault();
            }


            that.setState(that.cloneState, () => {
                if(newLine) {
                    textarea.selectionStart = cursor + 1;
                    textarea.selectionEnd = cursor + 1;
                }
            });
        }
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
                if(this.start == null) {
                    window.requestAnimationFrame(this.checkedAnimation)
                }

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
        const point = 800;
        if (progress < point) {
            this.checked.current.style.opacity = `${progress/point}`
        } else {
            this.checked.current.style.opacity = `${(1600 - progress) / point}`
        }

        if(progress > 1600) {
            this.start = null;
            this.checked.current.style.opacity = '0';
        } else {
            window.requestAnimationFrame(this.checkedAnimation);
        }
    }


    /************ render notes ***********/
    renderNotes() {
        return this.state.bullets.map((e, i) => {
            return (<li className={"noteboard2-note " + (this.state.delete ? "noteboard2-delete" : "noteboard2-normal")} key={e.id}>
                        <img
                            className='noteboard2-delete-icon'
                            src={deleteIcon}
                            onClick={this.clickDelete(e, i)}/>
                        <Textarea
                            className={(this.state.edit === e? "noteboard2-text" : "noteboard2-passage")}
                            readOnly={this.state.edit === e? null : "readOnly"}
                            autoFocus
                            onKeyPress={this.typeEnter(i)}
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
                className="noteboard2"
                onDoubleClick={this.doubleClickNoUseElement}
                onClick={this.clickNoUseElement}
            >
                <h3 className="noteboard2-title">
                    Message Board
                    <button className='noteboard2-button-icon noteboard2-button-minus' onClick={this.clickMinus}> - </button>
                    <button className='noteboard2-button-icon noteboard2-button-plus' onClick={this.clickPlus}> + </button>
                </h3>

                <ul className="noteboard2-notes" ref={this.NoteBoard}>
                {
                    this.renderNotes()
                }

                {
                    this.state.bullets.length === 0 ?
                    <h3 className="noteboard2-tutorial"> Double Click here to <br/><br/> start new message <br/> </h3> : null
                }
                </ul>


                <div className="noteboard2-button">
                    {/* <input className="noteboard2-remove" type="submit" value="Delete" onClick={this.saveEdit}/> */}
                    <div className="noteboard2-submit-img-section" ref={this.checked}>
                        <img className="noteboard2-submit-img" src={checked} />
                    </div>
                    <input className="noteboard2-submit center-block" type="submit" value="Save" onClick={this.clickSave}/>
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
