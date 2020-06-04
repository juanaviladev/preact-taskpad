import {h, Component} from 'preact';
import 'bootstrap/dist/css/bootstrap.css';
import {NewTaskItem} from "./NewTaskItem";
import Placeholder from "./img/list_placeholder.png";
import React from "preact/compat";
import {TaskItem} from "./TaskItem";

export default class TaskList extends Component {

    state = {
        tasks: []
    }

    constructor(props) {
        super(props);
        this.onSaveChangesClick = async (id, idx, body) => {
            await this.props.dao.update({id, body})
            this.setState(prevState => {
                prevState.tasks[idx] = {id, body}
                return ({
                    tasks: prevState.tasks
                });
            });
        }
        this.onDeleteClick = async (id) => {
            await this.props.dao.delete(id)
            this.setState(prevState => ({
                tasks: prevState.tasks.filter(el => el.id !== id)
            }));
        }
    }

    async componentDidUpdate(previousProps, previousState, snapshot) {
        if (previousProps.dao)
            return

        const tasks = await this.props.dao.readAll()
        this.setState(prevState => ({
            tasks
        }))
    }

    render() {
        let newTaskForm = "";
        if (this.props.creatingNewTask) {
            newTaskForm = <div className={"col-10 offset-1"}>
                <NewTaskItem cancelListener={this.onNewTaskCancelClick.bind(this)}
                             saveListener={this.onNewTaskSaveClick.bind(this)}/>
            </div>
        }
        const items = this.state.tasks.map((item, idx) =>
            <div className="col-10 offset-1">
                <TaskItem key={item.id} id={item.id} idx={idx} onSaveChangesListener={this.onSaveChangesClick.bind(this)}
                          onDeleteListener={this.onDeleteClick.bind(this)} item={item}/>
            </div>
        )
        const showPlaceholder = items.length === 0 && !this.props.creatingNewTask
        let list;
        if (showPlaceholder) {
            list = [
                <div className="row d-flex justify-content-center align-items-center">
                    <img alt="Lista vacía" className="col-lg-4 col-md-8 col-sm-10 img-fluid" src={Placeholder}/>
                </div>,
                <h2 className="text-center">No hay ninguna tarea guardada</h2>
            ]
        } else {
            list = (
                <div className="row">
                    {newTaskForm}
                    {items}
                </div>
            );
        }
        return (
            <div className="container-fluid">
                {list}
            </div>
        );
    }

    onNewTaskCancelClick() {
        this.props.onNewTaskDoneListener()
    }

    async onNewTaskSaveClick(body) {
        const newTask = await this.props.dao.create({body})
        this.props.onNewTaskDoneListener()
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask],
        }))
    }

}
