import config from 'react-global-configuration';
import localStorage from 'local-storage';

export default function actionOnCreate (value)
{
    return async dispatch => {
        let val = JSON.stringify(value);
        let result = await fetch(`${config.get('server')}/store`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage('jwt_token').jwt.token}`
            },
            body: val
        });
        if (result.ok) {
            return true
        }
        let payload = await result.json();
        return dispatch({type: 'CREATE_ERROR',  payload })
    }
}