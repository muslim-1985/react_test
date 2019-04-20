import config from 'react-global-configuration';
import localStorage from 'local-storage';

export default function actionOnEdit (value, history, id)
{
    return async dispatch => {
        let val = JSON.stringify(value);
        let result = await fetch(`${config.get('server')}/update/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage('jwt_token').jwt.token}`
            },
            body: val
        });

        if (result.ok) {
            await history.push('/');
            return true
        }
        let payload = await result.json();
        return dispatch({type: 'UPDATE_ERROR',  payload })
    }
}