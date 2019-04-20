import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import actionOnEdit from "../actions/edit";
import Menu from '../containers/menu';
import actionFetchArticle from "../actions/article_show";
import {Link} from "react-router-dom";

class Article extends Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.state = {
            title: '',
            body: ''
        };
    }

    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({title: nextProps.article.title, body: nextProps.article.body});
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    edit(id) {
        this.props.onEdit(
            {
                title: this.state.title,
                body: this.state.body
            },
            this.props.history,
            id
        );
        this.setState({title: '', body: ''})
    }

    render() {
        const {article} = this.props;
        return (
            <Fragment>
                <Menu/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    Dashboard
                                    <Link to='/' type="button"
                                       className="btn btn-primary btn-sm" style={{float: 'right'}}>Back</Link>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="card-header">
                                                {article.title}
                                            </div>
                                            <div className="card-body">
                                                {article.body}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="card-header">
                                                Edit
                                            </div>
                                            <div className="card-body">
                                                <div className="input-group input-group-sm mb-3"
                                                     style={{marginTop: 15 + 'px'}} key={article.id} >
                                                    <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                  id="inputGroup-sizing-sm">Article title</span>
                                                    </div>
                                                    <input type="text" name="title" value={this.state.title}
                                                           className="form-control" aria-label="Small"
                                                           aria-describedby="inputGroup-sizing-sm" onChange={this.onChange}/>
                                                </div>
                                                <div className="input-group input-group-sm mb-3"
                                                     style={{marginTop: 15 + 'px'}} key={article.id +1} >
                                                    <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                  id="inputGroup-sizing-sm">Article body</span>
                                                    </div>
                                                    <textarea name="body" value={this.state.body}
                                                           className="form-control" aria-label="Small"
                                                           aria-describedby="inputGroup-sizing-sm" rows="5" onChange={this.onChange}/>
                                                </div>

                                                <button className="btn btn-primary" onClick={() => this.edit(article.id)}
                                                        style={{marginTop: 15 + 'px'}}>Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        article: state.article,
        editError: state.editError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onEdit(value, history, id) {
            dispatch(actionOnEdit(value, history, id))
        },
        fetchArticle(id) {
            dispatch(actionFetchArticle(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)