import {h, Component} from 'preact';
import 'bootstrap/dist/css/bootstrap.css';
import {SQLiteTaskDao} from "../../persistence/SQLiteTaskDao";
import {NewTaskItem} from "./NewTaskItem";
import Placeholder from "./img/list_placeholder.png";
import Header from "../header/header";
import React from "preact/compat";
import {TaskItem} from "./TaskItem";
import {taskDaoInstance} from "../../Injection";

export default class TaskList extends Component {

    state = {
        tasks: []
    }

    constructor(props) {
        super(props);
        this.itemListener = {
            onSaveChangesClick: async (id, body) => {
                await this.dao.update({id, body})
            },
            onDeleteClick: async (id) => {
                await this.dao.delete(id)
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(el => el.id !== id)
                }));
            }
        }
    }

    async componentDidMount() {
        this.dao = this.props.dao
        await this.dao.init()
        const tasks = await this.dao.readAll()
        await this.dao.init()
        this.setState({
            tasks,
        })
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
                <TaskItem key={item.id} id={item.id} listener={this.itemListener} item={item}/>
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
        const newTask = await this.dao.create({body})
        this.props.onNewTaskDoneListener()
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask],
        }))
    }

}
