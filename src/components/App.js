import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App.css';
import actionFetchAllArticles from '../actions/articles';
import actionFetchArticle from '../actions/article_show';
import actionDeleteArticle from '../actions/delete';
import actionOnCreate from '../actions/create';
import Menu from "../containers/menu";
import {Link} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.createArticle = this.createArticle.bind(this);
        this.state = {
            articles: false
        }
    }

    componentDidMount() {
        this.props.fetchArticles();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({articles: nextProps.articles});
    };

    editArticle(id) {
        return this.props.fetchArticle(id)
    }

    deleteArticle(id) {
        this.props.deleteArticle(id);
        const data = this.state.articles.filter(i => i.id !== id);
        this.setState({articles: data})
    }

    createArticle() {
        this.props.createArticle(
            {
                title: this.title.value,
                body: this.body.value,
            }
        );
        this.title.value = '';
        this.body.value = '';
        this.componentDidMount()
    }

    render() {
        const pStyle = {
            float: 'right',
        };
        const margin = {
            marginTop: '15px'
        };
        return (
            <div>
                <Menu/>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row" style={margin}>
                                <div className="col-6">
                                    <h3 className="mb-5">Posts: </h3>
                                </div>
                                <div className="col-6">
                                    <button type="button" data-toggle="modal"
                                            data-target="#exampleModalCenter" className="btn btn-sm btn-light"
                                            style={pStyle}>+ Create
                                    </button>
                                </div>
                            </div>

                            {this.state.articles ? this.state.articles.map(article => {
                                return <div className="card" key={article.id}>
                                    <div className="card-header">
                                        {article.created_at}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.body}</p>
                                    </div>
                                    <div className="card-footer text-muted">
                                        <Link to={`/article/${article.id}`} className="btn btn-sm btn-light"
                                              onClick={() => this.editArticle(article.id)}>Edit</Link>
                                        <button className="btn btn-sm btn-danger"
                                                onClick={() => {if(window.confirm('Delete the item?')) this.deleteArticle(article.id)}}>Delete
                                        </button>
                                    </div>
                                </div>
                            }) : null}

                            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Create article</h5>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="card-body">
                                                <div className="input-group input-group-sm mb-3"
                                                     style={{marginTop: 15 + 'px'}}>
                                                    <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                  id="inputGroup-sizing-sm">Article title</span>
                                                    </div>
                                                    <input type="text" name="title"
                                                           className="form-control" aria-label="Small"
                                                           aria-describedby="inputGroup-sizing-sm"
                                                           ref={(input) => {
                                                               this.title = input;
                                                           }}
                                                           />
                                                </div>
                                                <div className="input-group input-group-sm mb-3"
                                                     style={{marginTop: 15 + 'px'}}>
                                                    <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                  id="inputGroup-sizing-sm">Article body</span>
                                                    </div>
                                                    <textarea name="body"
                                                              className="form-control" aria-label="Small"
                                                              aria-describedby="inputGroup-sizing-sm" rows="5"
                                                              ref={(input) => {
                                                                  this.body = input;
                                                              }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-dismiss="modal">Close
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={this.createArticle}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchArticles() {
            dispatch(actionFetchAllArticles());
        },
        fetchArticle(id) {
            dispatch(actionFetchArticle(id))
        },
        deleteArticle(id) {
            dispatch(actionDeleteArticle(id))
        },
        createArticle(value) {
            dispatch(actionOnCreate(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)