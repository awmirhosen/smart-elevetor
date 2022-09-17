import axios from 'axios';
import {
    SIDEX_REQUEST,
    SIDEX_SUCCESS,
    SIDEX_FAILED
}
    from './sidexTypes';


export const fetchSidex = () => {

    return async (dispatch) => {

        const url = 'http://185.126.200.99:8000/api/v1/';

        try {

            axios.get(url, {
                headers: {
                    'user_id': localStorage.getItem('user_id'),
                    'token': localStorage.getItem('token'),
                    'project_id': localStorage.getItem('project_id')
                }
            })
                .then(res => {

                    if (res.data.meta.status_code == 200) {
                        dispatch({
                            type: SIDEX_SUCCESS,
                            payload: {
                                project: res.data.data.project,
                                lines: res.data.data.lines,
                                floors: res.data.data.floors,
                                buttons: res.data.data.buttons
                            }
                        })
                    }

                })
                .catch(error => {

                    console.log(error)
                })

        } catch (error) {

        }

    }

}
