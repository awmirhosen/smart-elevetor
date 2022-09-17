import axios from 'axios';
import {
    UPDATE_SMART_SUCCESS,
    UPDATE_SMART_REQUEST,
    UPDATE_SMART_LOADING
}
    from './updateTypes';
import {error} from "next/dist/build/output/log";




export const requestUpdateDestination = (floorIdFrom, floorIdTo, status) => {



    return async (dispatch) => {

        console.log(floorIdFrom, floorIdTo, status)

        try {
            const headers = {
                'user_id': localStorage.getItem('user_id'),
                'token': localStorage.getItem('token'),
                'project_id': localStorage.getItem('project_id')
            }

            const data =
                {
                    'None': [
                        {
                        '_floor_id_from': floorIdFrom,
                         '_floor_id_to': floorIdTo,
                         'status': status
                        }
                    ]
                }
            console.log(data)

            const url = 'http://185.126.200.99:8000/api/v1/update_buttons';

            axios.post(url, JSON.stringify(data), {
                headers: headers
            })
                .then(res => {
                    console.log(res.data)

                })
        }
        catch (erorr) {
            console.log(error)
        }

    }

}




export const requestUpdateSmart = (lineId, floorId,isCallBtn, status) => {

    const type = localStorage.getItem('project_id');


    return async (dispatch) => {

        try {
            // console.log('from'+from+'to'+to+'line'+line);
            const headers = {
                'user_id': localStorage.getItem('user_id'),
                'token': localStorage.getItem('token'),
                'project_id': localStorage.getItem('project_id')
            }

            const data =
            {
                'None': [
                    {
                        '_line_id': lineId,
                        '_floor_id': floorId,
                        '_is_call_button': isCallBtn,
                        'status': status
                    }
                ]
            }

            const url = 'http://185.126.200.99:8000/api/v1/update_buttons';

            axios.post(url, JSON.stringify(data), {
                headers: headers
            })
                .then(res => {
                    console.log(res.data)
                })

        }
        catch (erorr) {
            console.log(error)
        }

    }

}
