import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux';
import actionOnLogin from "../actions/login";
import Menu from '../containers/menu';

class Login extends Component {
    constructor (props) {
        super(props);
        this.btnOnClick = this.btnOnClick.bind(this);
    }
    btnOnClick () {
        this.props.onLogin({email: this.email.value, password: this.password.value}, this.props.history);
        this.email.value = '';
        this.password.value = '';
    }
    render () {
        const {auth} = this.props;
        console.log(auth);
        return (
            <Fragment>
                <Menu auth={true}/>
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                            {auth ?
                                <div className="alert alert-danger" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    {auth.error}
                                    {auth.errors ?
                                        Object.keys(auth.errors).map(err => {
                                            return <p>{auth.errors[err]}</p>
                                        })
                                        :null
                                    }
                                </div>
                                : null}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsername">Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail"
                                           aria-describedby="emailHelp" placeholder="Enter email" ref={(input) => { this.email = input; }} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           placeholder="Password" ref={(input) => { this.password = input; }} />
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

function mapStateToProps (state) {
    return {
        auth: state.auth
    }
}
function mapDispatchToProps (dispatch) {
    return {
        onLogin (value, history) {
            dispatch(actionOnLogin(value, history))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Login)