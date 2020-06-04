import {Edit} from 'preact-feather';
import {Edit2} from 'preact-feather';
import React from "preact/compat";

const Header = (props) => (
    <header>
        <nav style="background-color: #673AB7; box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);" className="navbar mb-5 navbar-expand-sm navbar-dark justify-content-end">
            <span className="navbar-brand"><Edit/> TaskPad</span>
            <button onClick={props.newListener} className="btn shadow ml-auto mr-1 btn-light">
                <Edit2/> Añadir nueva tarea
            </button>
        </nav>
    </header>
);

export default Header;
