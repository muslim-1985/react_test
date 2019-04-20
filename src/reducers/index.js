import { combineReducers } from 'redux';
import articles from './articles'
import article from './article'
import auth from './auth'
import register from './register'
import editError from './edit_error'
import deleteArticle from './delete'
import createError from './create_error'

export default  combineReducers({
    articles,
    article,
    auth,
    register,
    editError,
    deleteArticle,
    createError
})