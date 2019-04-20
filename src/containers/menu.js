import React, {Component} from 'react'
import {Link} from "react-router-dom";
import localStorage from 'local-storage';
import config from "react-global-configuration";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    async logout() {
        let result = await fetch(`${config.get('server')}/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage('jwt_token').jwt.token}`
            }
        });
        let payload;
        if (result.ok) {
            payload = await result.json();
        }
        await localStorage.clear();
        return payload;
    }

    render() {
        let auth;
        if (!this.props.auth) {
            auth = <li className="nav-item active">
                <Link to='/login' className="nav-link" onClick={this.logout}>Logout</Link>
            </li>;
        } else {
            auth = <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Auth
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to='/login' className="dropdown-item">Login</Link>
                    <div className="dropdown-divider"></div>
                    <Link to='/Register' className="dropdown-item">Register</Link>
                </div>
            </li>
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        {auth}
                    </ul>
                </div>
            </nav>
        )
    }
}
