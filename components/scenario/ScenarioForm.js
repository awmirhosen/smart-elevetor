import React, {useEffect, useState} from "react";
import {
    Card,
    TextField,
    Typography,
    Button,
    Stack,
    Divider,
    Select,
    MenuItem,
    FormControlLabel, Checkbox, FormGroup,
} from "@mui/material"
import {useFormik} from "formik"
import * as Yup from "yup"
import style from './scenario.module.scss'
import {useSelector} from "react-redux";
import axios from "axios";
import $ from 'jquery'
import {useRouter} from "next/router";
import {map} from "react-bootstrap/ElementChildren";


function App() {

    // define router
    const router = useRouter()
    const [data, setData] = useState()
    const [lineLength, setLineLength] = useState(null);
    const [button, setButton] = useState([]);
    const [lines, setLines] = useState([]);
    const [arrayButtons, setArrayButtons] = useState([]);
    const url = 'http://185.126.200.99:8000/api/v1/';


    // sending request data
    const addUrl = 'http://185.126.200.99:8000/api/v1/save_scenario';
    const headers = {
        'user_id' : localStorage.getItem('user_id'),
        'token': localStorage.getItem('token'),
        'project_id' : localStorage.getItem('project_id')
    }
    const  project_id = headers.project_id

    // getting scenario detail
    useEffect(() => {

        const getData = async () => {
            const data = await axios.get(url, {
                headers: headers
            }).then(res => {

                if (project_id == 1){

                    setData(res.data.data)
                    setLines(res.data.data.lines)
                    setButton(res.data.data.buttons)
                    console.log(res.data.data)
                }
                setButton(res.data.data.buttons)

            }).catch((error) => {
                console.log(error)
            })
        }
        getData()


    }, [])

    if (project_id == 2) {
        var test = [
            button.map((item) => (
                {
                    _floor_id_from : item.floor_id_from,
                    _floor_id_to : item.floor_id_to,
                    status : item.status
                }
            ))
        ]
    } else {

        const test1 =
            lines.map((line) => (
                button[`${line.line_index}`].buttons_floors.map((btn) => (
                    {
                        _line_id : line.line_id,
                        _floor_id : btn.floor_id,
                        _is_call_button : btn.is_call_button,
                        status : btn.status
                    }
                ))
            ))


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



    //validation schema for form validation
    const schema = Yup.object({
        name:Yup.string().required("پر کردن این فیلد الزامیست"),
        begin_time:Yup.string().required("پر کردن این فیلد الزامیست"),
        end_time:Yup.string().required("پر کردن این فیلد الزامیست"),
        enabled:Yup.number().required("پر کردن این فیلد الزامیست")
    })

    // Fomrik submit and initial values
    const formik = useFormik({
        // initial values set
        initialValues:{
            name : "",
            begin_time : "",
            end_time : "",
            enabled : 1,
        },

        // onsubmit function
        onSubmit: async (values, helpers) => {
            // sending request for adding scenario

            if (project_id == 2) {
                $.ajax({
                    type: "POST",
                    headers: headers,
                    url: addUrl,
                    data: JSON.stringify({'scenario_id': 'None', 'name': values.name, 'begin_time': values.begin_time, 'end_time': values.end_time , 'enabled': values.enabled,
                        'buttons': test[0]
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
            }else {

                $.ajax({
                    type: "POST",
                    headers: headers,
                    url: addUrl,
                    data: JSON.stringify({'scenario_id': 'None', 'name': values.name, 'begin_time': values.begin_time, 'end_time': values.end_time , 'enabled': values.enabled,
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
        validationSchema:schema
    })

    // handle click for changing status
    const handelClick = (index)=>{
        console.log(index)
        const copyButton = [...button];
        if (copyButton[index].status === 1) {
            copyButton[index].status = 0
        }else {
            copyButton[index].status=  1;
        }

        setButton(copyButton)
    }

    const handleSmartClick = (index, line) => {

        const copyBtn = button[`${line}`];


        if (copyBtn.buttons_floors[index].status == 1) {
            copyBtn.buttons_floors[index].status = 0
        }else {
            copyBtn.buttons_floors[index].status = 1
        }

        console.log(copyBtn)

        setButton({
            ...button,
            buttons_floors : copyBtn
        })

        console.log(button)

    }


    if (button !== undefined){


        return (
            <>
                {
                    project_id == 1 ? (
                        <>
                            <div className={style.scenarioWrapper} style={{ margin : '10px 0' }}>

                                <form onSubmit={formik.handleSubmit}>

                                    {/*name input*/}
                                    <TextField
                                        fullWidth
                                        label="scenario name"
                                        name="name"
                                        error={formik.errors.name}
                                        helperText={formik.errors.name}
                                        onChange={formik.handleChange}
                                        margin="normal"
                                    >
                                    </TextField>

                                    {/*begin time and end time input*/}
                                    <Stack
                                        direction="row"
                                        sx={{margin : '0 0 5px 0'}}
                                        spacing={2}
                                    >
                                        <TextField
                                            label="Begin time"
                                            name="begin_time"
                                            error={formik.errors.begin_time}
                                            helperText={formik.errors.begin_time}
                                            onChange={formik.handleChange}
                                        >
                                        </TextField>

                                        <TextField
                                            label="End time"
                                            name="end_time"
                                            error={formik.errors.end_time}
                                            helperText={formik.errors.end_time}
                                            onChange={formik.handleChange}
                                        >
                                        </TextField>
                                    </Stack>

                                    {/*select box for enable or disable */}
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


                                {
                                    lines.map((item) => (
                                        <div>

                                                <p className='w-100 text-center fw-bold '>{item.line_name}</p>

                                                <div className='w-75 my-4 mx-auto'>
                                                    <div className="row row-cols-3 row-cols-sm-10 row-cols-md-10 g-3">

                                                        {
                                                            button[`${item.line_index}`].buttons_floors.map((btn, index) => (
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

                                <Button variant="contained" type="submit" name="submit">Submit</Button>

                                </form>

                            </div>

                        </>
                    ) : (
                        <>
                            <div className={style.scenarioWrapper} style={{ margin : '10px 0' }}>
                                <form onSubmit={formik.handleSubmit}>


                                    {/*name input*/}
                                    <TextField
                                        fullWidth
                                        label="scenario name"
                                        name="name"
                                        error={formik.errors.name}
                                        helperText={formik.errors.name}
                                        onChange={formik.handleChange}
                                        margin="normal"
                                    >
                                    </TextField>

                                    {/*begin time and end time input*/}
                                    <Stack
                                        direction="row"
                                        sx={{margin : '0 0 5px 0'}}
                                        spacing={2}
                                    >
                                        <TextField
                                            label="Begin time"
                                            name="begin_time"
                                            error={formik.errors.begin_time}
                                            helperText={formik.errors.begin_time}
                                            onChange={formik.handleChange}
                                        >
                                        </TextField>

                                        <TextField
                                            label="End time"
                                            name="end_time"
                                            error={formik.errors.end_time}
                                            helperText={formik.errors.end_time}
                                            onChange={formik.handleChange}
                                        >
                                        </TextField>
                                    </Stack>

                                    {/*select box for enable or disable */}
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

                                    <div className='w-75 my-4 mx-auto'>
                                        <div className="row row-cols-4 row-cols-sm-10 row-cols-md-10 g-3">

                                            {
                                                button.map((item,index) => (
                                                    <>

                                                        {/*{item.floor_name_from} to {item.floor_name_to}*/}
                                                        <div className="col" key={index}>
                                                            <div className="card shadow-sm flex justify-content-center align-items-center" onClick={() => handelClick(index)} style={{backgroundColor: item.status === 1 ? 'green' : 'red', color: 'white' }}>
                                                                {item.floor_name_from} to {item.floor_name_to}
                                                            </div>
                                                        </div>

                                                    </>
                                                ))
                                            }

                                        </div>
                                    </div>


                                    <Button variant="contained" type="submit" name="submit">Submit</Button>
                                </form>

                            </div>
                        </>
                    )
                }
            </>
        )
    }else {
        return (
            <>
                loading ....
            </>
        )
    }

}

export default App;