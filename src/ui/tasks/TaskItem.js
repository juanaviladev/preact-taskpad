import {h, Component} from 'preact';
import 'bootstrap/dist/css/bootstrap.css';
import {SQLiteTaskDao} from "../../persistence/SQLiteTaskDao";

export class TaskItem extends Component {

    state = {
        editing: false,
        body: this.props.item.body,
        error: false,
        savingChanges: false,
    }

    constructor(props) {
        super(props);
        this.dao = new SQLiteTaskDao()
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

    onSaveChangesClick() {
        const body = this.state.body
        if(body.trim().length === 0) {
            this.setState(prevState => ({
                error: true
            }))
            return
        }

        this.props.listener.onSaveChangesClick(this.props.item.id, body)
        this.setState(prevState => ({
            editing: false
        }))
    }

    render({}, {}) {
        const editMode = this.state.editing;
        let body;
        if (editMode) {
            body = <div className="form-group">
                <textarea onChange={e => this.onBodyChange(e)} className={(this.state.error ? "is-invalid" : "") + " card-text form-control"} value={this.state.body} rows="5"/>
                <div className="invalid-feedback">
                    El contenido de la tarea no puede quedar en blanco
                </div>
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
                            <a href="#" className={'card-link ' + (!this.state.editing ? 'd-none' : 'mr-1')} onClick={e => this.onCancelEdit(e)}>Cancelar </a>
                            <a href="#" className={'card-link ' + (this.state.editing ? 'd-none' : 'mr-1')} onClick={e =>this.onEditClick(e)}>Editar </a>
                            <a href="#" className={'card-link ' + (!this.state.editing ? 'd-none' : 'mr-1')} onClick={e => this.onSaveChangesClick(e)}>Guardar cambios </a>
                            <a href="#" className="card-link" onClick={() => this.props.listener.onDeleteClick(this.props.id)}>Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    onBodyChange(ev) {
        const body = ev.target.value
        this.setState(prevState => ({
            body: body
        }))
    }

}
