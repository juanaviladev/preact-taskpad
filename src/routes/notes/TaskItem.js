import {h, Component} from 'preact';
import style from './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {SQLiteTaskDao} from "../../data/SQLiteTaskDao";

export class TaskItem extends Component {

    state = {
        editing: false,
        savingChanges: false,
    }

    constructor(props) {
        super(props);
        this.state.body = props.item.body
        this.dao = new SQLiteTaskDao()
    }

    async componentDidMount() {
        // start a timer for the clock:
        this.listener = this.props.listener
        this.dao = new SQLiteTaskDao()
        await this.dao.init()
    }

    onCancelEdit() {
        this.setState(prevState => ({
            editing: false
        }))
    }

    onEditClick() {
        this.setState(prevState => ({
            editing: true
        }))
    }

    onBodyChange(body) {
        this.setState(prevState => ({
            body: body
        }))
    }

    onSaveChangesClick(ev) {
        const body = this.state.body
        this.props.listener.onSaveChangesClick(this.props.item.id, body)
        this.setState(prevState => ({
            editing: false
        }))
    }

    render({}, {}) {
        console.log("aa")
        const editMode = this.state.editing;
        let body;
        if (editMode) {
            body = <div className="form-group">
                <textarea onInput={(e) => this.onBodyChange(e.target.value)} className="card-text form-control" value={this.state.body} rows="3"/>
            </div>
        } else {
            body = <p className="card-text">{this.state.body}</p>
        }
        const saving = this.state.savingChanges
        return (
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Tarea {this.props.item.id}</h5>
                            {body}
                        </div>
                        <div className="card-footer text-right">
                            <div className={"spinner-border spinner-border-sm text-primary mr-2 " + (saving ? '' : 'd-none')} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <a href="#" className={'card-link ' + (!this.state.editing ? 'd-none' : 'mr-1')} onClick={this.onCancelEdit.bind(this)}>Cancelar </a>
                            <a href="#" className={'card-link ' + (this.state.editing ? 'd-none' : 'mr-1')} onClick={this.onEditClick.bind(this)}>Editar </a>
                            <a href="#" className={'card-link ' + (!this.state.editing ? 'd-none' : 'mr-1')} onClick={this.onSaveChangesClick.bind(this)}>Guardar cambios </a>
                            <a href="#" className="card-link" onClick={() => this.props.listener.onDeleteClick(this.props.id)}>Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}
