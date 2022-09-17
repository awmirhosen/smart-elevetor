import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
}
    from './userTypes';



export const login = (values) => {

    return async (dispatch) => {

        const url = 'http://185.126.200.99:8000/api/v1/login';

        let formData = new FormData();
        formData.append('username', values.userName);
        formData.append('password', values.password);
        // formData.append('remember', values.remember[0] == 'on' ? 1 : 0)

        try {

            dispatch({
                type: LOGIN_REQUEST,
            });

            axios.post(url, formData)
                .then((response) => {
                    console.log(response.data.data)
                    if (response.data.meta.status_code == 200) {
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('user_id', response.data.data.user_id);
                        localStorage.setItem('project_id', response.data.data.project_id);
                        localStorage.setItem('user_type', response.data.data.user_type);
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {
                                'token': response.data.data.token,
                                'user_id': response.data.data.user_id,
                                'project_id': response.data.data.project_id,
                                'user_type': response.data.data.user_type
                            }
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        }
        catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error
            });
        }

    }

}