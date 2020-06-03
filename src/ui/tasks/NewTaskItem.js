import {h, Component} from 'preact';
import 'bootstrap/dist/css/bootstrap.css';

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
                                <textarea onChange={ev => this.onChange(ev)} placeholder="Aqui la descripción de la tarea..." className={(this.state.error ? "is-invalid" : "") + " card-text form-control"} rows="5"></textarea>
                                <div className="invalid-feedback">
                                    El contenido de la tarea no puede quedar en blanco
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-right">
                            <a href="#" className="card-link mr-1" onClick={this.props.cancelListener}>Cancelar </a>
                            <a href="#" className="card-link" onClick={this.onSaveClick.bind(this)}>Guardar</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    onChange(ev) {
        const body = ev.target.value
        this.setState(prevState => ({
            body: body
        }))
    }

    onSaveClick() {
        const body = this.state.body
        if(body.trim().length === 0) {
            this.setState(prevState => ({
                error: true
            }))
            return
        }
        this.props.saveListener(body)
    }

}
