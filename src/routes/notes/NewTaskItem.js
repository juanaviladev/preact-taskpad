import {h, Component} from 'preact';
import style from './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {SQLiteTaskDao} from "../../data/SQLiteTaskDao";

export class NewTaskItem extends Component {

    state = {
        body: ""
    }

    constructor(props) {
        super(props);
    }

    render({}, {}) {
        return (
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Nueva tarea</h5>
                            <div className="form-group">
                                <textarea onChange={this.onBodyChanged.bind(this)} placeholder="Aqui la descripción de la tarea..." className="card-text form-control" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="card-footer text-right">
                            <a href="#" className="card-link mr-1" onClick={() => this.props.cancelListener()}>Cancelar </a>
                            <a href="#" className="card-link" onClick={() => this.props.saveListener(this.state.body)}>Guardar</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    onBodyChanged(ev) {
        this.setState(prevState => ({
            body: ev.target.value
        }))
    }

}
