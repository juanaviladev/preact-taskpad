import {h} from 'preact';
import {Edit} from 'preact-feather';
import {Edit2} from 'preact-feather';

const Header = (props) => (
    <header>
        <nav style="background-color: #673AB7;box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);"
             className="navbar navbar-expand-sm navbar-dark justify-content-between">
            <span className="navbar-brand"><Edit/> TaskPad</span>
            <div>
                <button onClick={props.newListener} className="btn shadow ml-auto mr-1 btn-light">
                    <Edit2/> Nueva tarea
                </button>
            </div>
        </nav>
    </header>
);

export default Header;
