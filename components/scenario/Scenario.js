import React, {useEffect, useState} from "react";
import style from './scenario.module.scss'
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {Table} from "react-bootstrap";

const Scenario = () => {

    const [data, setData] = useState(
        [{
            begin_time: "20:00:22",
            enabled: 1,
            end_time:"22:00:00",
            id: 2,
            name: "Scenario 1",
            project_id: 2
    }]);
    const router = useRouter()
    const url = 'http://185.126.200.99:8000/api/v1/';



    // getting scenario detail
    useEffect(() => {

        const getData = async () => {
            const data = await axios.get(url, {
                headers: {
                    'user_id': localStorage.getItem('user_id'),
                    'token': localStorage.getItem('token'),
                    'project_id': localStorage.getItem('project_id')
                }
            }).then(res => {
                console.log(res.data.data)
                setData(res.data.data.scenarios)
            }).catch((error) => {
                console.log(error)
            })
        }
        getData()

    }, [])

    console.log(data)

    return (
        <>
            <div>
                <div style={{position: 'fixed', top: '10px'}}
                onClick={() => router.push('scenario/Add')}
                >
                    <Button color='success' variant="contained">ADD</Button>
                </div>

                {/*table start*/}
                <div>
                    <Table striped bordered hover variant="dark" style={{ marginTop : '15px' }}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Begin</th>
                            <th>End</th>
                            <th>  </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => (

                                    <tr key={index}>
                                        <td style={{color : item.enabled == 1 ? 'green' : 'red'}}>{item.name}</td>
                                        <td>{item.begin_time}</td>
                                        <td>{item.end_time}</td>
                                        <td onClick={() => router.push(`scenario/${item.id}`) }> <Button color='warning' variant="outlined">Deatail</Button> </td>
                                    </tr>

                            ))
                        }
                        </tbody>
                    </Table>
                </div>



            </div>
        </>
    )
}
export default Scenario;