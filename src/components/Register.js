import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import actionOnRegister from "../actions/register";
import Menu from '../containers/menu';

class Register extends Component {
    constructor(props) {
        super(props);
        this.btnOnClick = this.btnOnClick.bind(this);
    }

    btnOnClick() {
        this.props.onRegister(
            {
                name: this.name.value,
                email: this.email.value,
                password: this.password.value,
                password_confirmation: this.password_confirmation.value
            },
            this.props.history
        );
        this.name.value = '';
        this.email.value = '';
        this.password.value = '';
        this.password_confirmation.value = '';
    }

    render() {
        const {register} = this.props;
        return (
            <Fragment>
                <Menu auth={true}/>
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                            {register ?
                                Object.keys(register).map(err => {
                                    return <div className="alert alert-danger" role="alert">
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                            {register[err]}
                                    </div>

                                })
                                : null}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsername">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername"
                                           aria-describedby="emailHelp" placeholder="Enter username" ref={(input) => {
                                        this.name = input;
                                    }}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail">Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail"
                                           placeholder="Email" ref={(input) => {
                                        this.email = input;
                                    }}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your
                                        email with anyone else.
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           placeholder="Password" ref={(input) => {
                                        this.password = input;
                                    }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleRepeatPassword">Repeat Password</label>
                                    <input type="password" className="form-control" id="exampleRepeatPassword"
                                           placeholder="Repeat Password" ref={(input) => {
                                        this.password_confirmation = input;
                                    }}/>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                            </form>
                            <button className="btn btn-primary" onClick={this.btnOnClick}>Submit</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracks,
        register: state.register
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onRegister(value, history) {
            dispatch(actionOnRegister(value, history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)