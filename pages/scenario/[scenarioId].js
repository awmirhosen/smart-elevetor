import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import $ from 'jquery'
import style from "../../components/scenario/scenario.module.scss";
import {useFormik} from "formik";
import {Button, MenuItem, Select} from "@mui/material";


const Index = () => {
    const router = useRouter()

    const [render, setRender] = useState();
    const [data, setData] = useState();
    const [buttons, setButtons] = useState([]);
    const [lineLength, setLineLength] = useState();
    const [lines, setLines] = useState([]);


    // getting scenario id
    const param = router.query.scenarioId

    // headers for setting data from localstorage and project type
    const headers = {
        'user_id' : localStorage.getItem('user_id'),
        'token': localStorage.getItem('token'),
        'project_id' : localStorage.getItem('project_id')
    }
    // project id for recognize the project type
    const project_id = headers.project_id


    // delete scenario information
    const deleteUrl = '185.126.200.99:8000/api/v1/delete_scenario';
    const deleteScenarioHandler = async (id) => {
        // ajax request for handling post req
        await $.ajax({
            type: "POST",
            headers: headers,
            url: 'http://185.126.200.99:8000/api/v1/delete_scenario',
            data: JSON.stringify({'scenario_id': id}),
            success: function(data){
                router.push('/scenario')
            },
            error: function(status){
                console.log(status)
            }
        });

    }

    const statusUrl = 'http://185.126.200.99:8000/api/v1/save_scenario'
    const statusHandler = (data) => {

        if (project_id == 2) {

            $.ajax({
                type: "POST",
                headers: headers,
                url: statusUrl,
                data: JSON.stringify({'scenario_id': data.scenario.id, 'name': data.scenario.name, 'begin_time': data.scenario.begin_time, 'end_time': data.scenario.end_time, 'enabled': data.scenario.enabled === 1 ? 0 : 1,
                    'buttons':
                        data.buttons.map(item =>(
                            {
                                '_floor_id_from' : item.floor_id_from,
                                '_floor_id_to' : item.floor_id_to,
                                'status' : item.status,
                            }
                        ))

                }),
                success: function(data){
                    console.log(JSON.parse(data))
                },
                error: function(status){
                    console.log(status)
                    console.log(lines)
                }
            });

        }else {
            console.log(data)
        }

    }

    const handleSmartClick = async (index, line) => {

        const copyBtn = data.buttons[`${line}`];


        if (copyBtn.buttons_floors[index].status == 1) {
            copyBtn.buttons_floors[index].status = 0
        }else {
            copyBtn.buttons_floors[index].status = 1
        }

        console.log(copyBtn)

        setData({
            ...data,
            buttons_floors : copyBtn
        })

        console.log(buttons)

    }


    // getting data information
    const mainUrl = 'http://185.126.200.99:8000/api/v1/';
    useEffect(() => {
        if (project_id == 1){
            const getAllData = async () => {
                const getData = await axios.get(mainUrl, {
                    headers: headers
                }).then(res => {
                    setLineLength(res.data.data.lines.length)
                    setLines(res.data.data.lines)

                }).catch((error) => {
                    console.log(error)
                })
            }
            getAllData()


        } else {
            console.log('loading...')
        }

    }, [data]);

    const url = 'http://185.126.200.99:8000/api/v1/scenario';
    const scenario_data = {
        scenario_id: param
    }
    // getting scenario detail
    useEffect(() => {

        if (project_id == 1) {
            const getData = async () => {
                const getData = await axios.post(url, JSON.stringify(scenario_data), {
                    headers: headers
                }).then(res => {
                    // setData(res.data.data)
                    setData((prevData) => res?.data?.data)
                    setButtons(data.buttons)
                    console.log(data)

                }).catch((error) => {
                    console.log(error)
                })
            }
            getData()

            for (let i = 0 ; i<2500; i++){
                setRender(i)
            }

        } else {
            const getData = async () => {
                const data = await axios.post(url, JSON.stringify(scenario_data), {
                    headers: headers
                }).then(res => {
                    setData(res.data.data)
                }).catch((error) => {
                    console.log(error)
                })
            }

            getData()

        }


        // setRender(render + 1)

    },  [render])



    const formik = useFormik({
        // initial values set
        initialValues:{
            enabled : 1,
        },

        // onsubmit function
        onSubmit: async (values, helpers) => {

            if (project_id == 2) {
                console.log('ddd')
            } else {
                const test1 =
                    lines.map((line) => (
                        data.buttons[`${line.line_index}`].buttons_floors.map((btn) => (
                            {
                                _line_id : line.line_id,
                                _floor_id : btn.floor_id,
                                _is_call_button : btn.is_call_button,
                                status : btn.status
                            }
                        ))
                    ))

                console.log(test1)

                var arr = []

                const final = async () => {
                    await test1.map(item => {
                        item.map(i => {
                            const amir = i
                            arr.push(amir)

                        })
                    })

                }

                final()

            }


            const addUrl = 'http://185.126.200.99:8000/api/v1/save_scenario';
            // sending request for update scenario
            if (project_id == 2) {
                console.log('eeeeee')
            }else {

                console.log(data.scenario)

                $.ajax({
                    type: "POST",
                    headers: headers,
                    url: addUrl,
                    data: JSON.stringify({'scenario_id': data.scenario.id, 'name': data.scenario.name, 'begin_time': data.scenario.begin_time, 'end_time': data.scenario.end_time , 'enabled': values.enabled,
                        'buttons': arr
                    }),
                    success: function(data){
                        console.log(JSON.parse(data))
                        router.push('/scenario')
                    },
                    error: function(status){
                        console.log(status)
                        console.log(test[0])
                    }
                });

            }


        },

    })







    if (data !== undefined){
        return (
            <Layout>
                <div className={style.scenarioWrapper} style={{ margin : '10px 0' }}>
                {/*title of scenario*/}
                <h1 className='text-center'>{data.scenario.name}</h1>

                <div className='d-flex justify-content-around w-100 mt-3'>
                    <h4>From : {data.scenario.begin_time}</h4>
                    <h4>to : {data.scenario.end_time}</h4>
                </div>



                {
                    project_id == 1 ? (

                        <div>
                            {
                                lines.map((item, index) => (
                                    <div key={index}>

                                        <p className='w-100 text-center fw-bold '>{item.line_name}</p>

                                        <div className='w-75 my-4 mx-auto'>
                                            <div className="row row-cols-3 row-cols-sm-10 row-cols-md-10 g-3">

                                                {
                                                    data.buttons[`${item.line_index}`].buttons_floors.map((btn, index) => (
                                                        <div className="col" key={index}>
                                                            <div className="card shadow-sm flex justify-content-center align-items-center text-center" onClick={() => handleSmartClick(index, item.line_index)}  style={{backgroundColor: btn.status === 1 ? 'green' : 'red', color: 'white' }}>
                                                                {btn.floor_name} is call button {btn.is_call_button}
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>

                                {
                                    data.scenario.enabled == 1 ? (
                                        <Select
                                            fullWidth
                                            variant="standard"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={1}
                                            name='enabled'
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={1}>Active</MenuItem>
                                            <MenuItem value={0}>Inactive</MenuItem>

                                        </Select>
                                    ) : (
                                        <Select
                                            fullWidth
                                            variant="standard"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={1}
                                            name='enabled'
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={0}>Inactive</MenuItem>
                                            <MenuItem value={1}>Active</MenuItem>

                                        </Select>
                                    )
                                }

                                <div className='d-flex justify-content-center align-items-center mt-3'>
                                    <button className='btn btn-danger mx-3' onClick={ () => deleteScenarioHandler(data.scenario.id) }>Delete</button>
                                    <button className='btn btn-info mx-3' type="submit"  name="submit">Save</button>
                                    <button onClick={() =>  router.push('/scenario')} className='btn btn-secondary mx-3'>Back</button>
                                </div>

                            </form>
                            
                        </div>
                    ) : (


                        // project id 2 codes
                    <div className='w-100'>
                    <div className="row row-cols-4 row-cols-sm-10 row-cols-md-10 g-3">
                        {
                            data.buttons.map((item, index) => (
                                <div className="col" key={index}>
                                    <div className="card shadow-sm flex justify-content-center align-items-center" style={{backgroundColor: item.status ===1 ? 'green' : 'red', color: 'white' }}>
                                        {item.floor_name_from} to {item.floor_name_to}
                                    </div>
                                </div>
                            ))
                        }

                        <div className='d-flex justify-content-center mt-5'>
                            <button className='btn btn-danger mx-3' onClick={ () => deleteScenarioHandler(data.scenario.id) }>Delete</button>
                            <button className='btn btn-warning mx-3' onClick={() => statusHandler(data) } >{ data.scenario.enabled == 1 ? 'Disabale' : 'Enable'  }</button>
                            <button onClick={() =>  router.push('/scenario')} className='btn btn-secondary mx-3'>Back</button>
                        </div>

                    </div>
                </div>

                    )
                }

                </div>
            </Layout>
        )
    }else{
        return (
            <Layout>
                 <p>loading</p>
            </Layout>
        )
    }

}
export default Index