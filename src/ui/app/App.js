import {Component} from 'preact';
import Header from '../header/header';
import React from "preact/compat";
import TaskList from "../tasks/TaskList";
import { dao } from "../../Locator";

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const inst = await dao
        this.setState(prevState => ({
            dao: inst,
        }))
    }

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
                    dao={this.state.dao}
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
