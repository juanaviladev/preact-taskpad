import {h, Component, createContext} from 'preact';
import {Router} from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import React from "preact/compat";
import {SQLiteTaskDao} from "../data/SQLiteTaskDao";
import {NewTaskItem} from "../routes/notes/NewTaskItem";
import style from "../routes/notes/style.css";
import {TaskItem} from "../routes/notes/TaskItem";
import Placeholder from "../routes/notes/img/list_placeholder.png";
import {LocalStorageTaskDao} from "../data/LocalStorageTaskDao";

export default class App extends Component {

    state = {
        tasks: [],
        creatingNewTask: false,
    }

    // gets called when this route is navigated to
    async componentDidMount() {
        // start a timer for the clock:
        this.itemListener = {
            onSaveChangesClick: async (id, body) => {
                await this.dao.update({id, body})
            },
            onDeleteClick: async (id) => {
                await this.dao.delete(id)
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(el => el.id !== id)
                }));
            },
            onEditClick: () => {

            }
        }
        this.dao = new LocalStorageTaskDao(window.localStorage)
        await this.dao.init()
        const tasks = await this.dao.readAll()
        this.setState({
            tasks,
        })
    }

    render() {
        let newTaskForm = "";
        if (this.state.creatingNewTask) {
            newTaskForm = <div className="col-10 offset-1">
                <NewTaskItem cancelListener={this.onNewTaskCancelClick.bind(this)}
                             saveListener={this.onNewTaskSaveClick.bind(this)}/>
            </div>
        }
        const items = this.state.tasks.map((item, idx) =>
            <div className="col-10 offset-1">
                <TaskItem key={item.id} id={item.id} listener={this.itemListener} item={item}/>
            </div>
        )
        const showPlaceholder = items.length === 0 && !this.state.creatingNewTask
        let list;
        if (showPlaceholder) {
            list = (
                <div className={style.profile}>
                    <div className="row d-flex justify-content-center">
                        <img className="col-lg-4 col-m-3 img-fluid" src={Placeholder}/>
                    </div>
                    <h2 className="text-center">No hay ninguna tarea guardada</h2>
                </div>
            )
        } else {
            list = (
                <div className={style.profile}>
                    <div className="row">
                        {newTaskForm}
                        {items}
                    </div>
                </div>
            );
        }
        return (
            <div id="app">
                <Header newListener={this.onNewTaskClick.bind(this)}/>
                {list}
            </div>
        );
    }

    onNewTaskCancelClick() {
        this.setState(prevState => ({
            creatingNewTask: false,
            newTask: {}
        }))
    }

    async onNewTaskSaveClick(body) {
        const newTask = await this.dao.create({body})
        this.setState(prevState => ({
            creatingNewTask: false,
            tasks: [...prevState.tasks, newTask],
            deleteAllEnabled: true
        }))
    }

    onNewTaskClick() {
        if (this.state.creatingNewTask)
            return

        this.setState(prevState => ({
            creatingNewTask: true,
        }))
    }
}
