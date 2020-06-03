import {Component} from 'preact';
import Header from '../header/header';
import React from "preact/compat";
import {taskDaoInstance} from "../../Injection";
import TaskList from "../tasks/TaskList";

export default class App extends Component {

    render() {
        return (
            <div id="app">
                <Header
                    newListener={this.onNewTaskClick.bind(this)}
                />
                <TaskList
                    creatingNewTask={this.state.creatingNewTask}
                    cancelNewTaskListener={this.onNewTaskClick.bind(this)}
                    onNewTaskDoneListener={this.onNewTaskDone.bind(this)}
                    dao={taskDaoInstance}
                />
            </div>
        );
    }

    onNewTaskDone() {
        this.setState(prevState => ({
            creatingNewTask: false,
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
