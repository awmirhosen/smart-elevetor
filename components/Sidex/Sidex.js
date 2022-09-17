import style from '../Sidex/sidex.module.scss'
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSidex } from "../../src/redux/sidex/sidexActions";
import Elevator from "../elevator/Elevator";
import ModalComponent from '../../components/modal/ModalComponent'


const Sidex = () => {

    const [openModal, setOpenModal] = useState(false);
    const [floor_index, setFloor_index] = useState();
    const [line_index, setLine_index] = useState();



    const ClickSettingFllorHandler = (x, floor_index = null, line_index = null) => {
        setOpenModal(x);

        if (floor_index != null && line_index != null) {
            setFloor_index(floor_index);
            setLine_index(line_index);
        }

    }

    const sidex = useSelector(state => state.sidexReducer);

    const [numberOfLines, setNumberOfLines] = useState();
    const [line1, setLine1] = useState();
    const [line2, setLine2] = useState({});
    const [line3, setLine3] = useState();
    const [line4, setLine4] = useState();

    useEffect(() => {

        setNumberOfLines(sidex.lines.length);
        if (numberOfLines <= 1) {
            setLine1(sidex.lines[0])
        }
        if (numberOfLines <= 2) {
            setLine1(sidex.lines[0])
            setLine2(sidex.lines[1])
        }
        if (numberOfLines <= 3) {
            setLine1(sidex.lines[0])
            setLine2(sidex.lines[1])
            setLine3(sidex.lines[2])
        }
        if (numberOfLines <= 4) {
            setLine1(sidex.lines[0])
            setLine2(sidex.lines[1])
            setLine3(sidex.lines[2])
            setLine4(sidex.lines[3])
        }

    }, [sidex])

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(fetchSidex())

    }, [])

    const [array, setArray] = useState([
        {
            id: '1',
            name: 'ehsan'
        },
        {
            id: '2',
            name: 'ramin'
        },
        {
            id: '2',
            name: 'ramin'
        },
        {
            id: '2',
            name: 'ramin'
        },
        {
            id: '2',
            name: 'ramin'
        },
        {
            id: '2',
            name: 'ramin'
        },
    ]);

    const [newArray, setNewArray] = useState([]);

    const [width, setWidth] = useState();

    const router = useRouter();

    const NumberOfArray = (x) => {

        let number;

        if (x <= 768) {
            number = 1;
        }
        if (x <= 992 && x > 768) {
            number = 2;
        }
        if (x <= 1200 && x > 992) {
            number = 3;
        }
        if (x >= 1200) {
            number = 4;
        }
        const newArray = array.filter((value, key) => {

            if (key <= number - 1) {
                return value;
            }
        })

        setNewArray(newArray);
    }

    useEffect(() => {
        let x = window.innerWidth;
        window.addEventListener("resize", () => {
            x = window.innerWidth;
            NumberOfArray(x);
            setWidth(x)
        });
        setWidth(x)
        NumberOfArray(x);
    }, []);

    const [pathProject_id, setPathProject_id] = useState();
    const [localProject_id, setLocalProjectId] = useState();
    const [userType, setUserType] = useState();
    useEffect(() => {

        setPathProject_id(router.query.projectId);
        setUserType(localStorage.getItem('user_type'));
        setLocalProjectId(localStorage.getItem('project_id'))

    }, [router.query.projectId])

    useEffect(() => {

        if (pathProject_id != null && localProject_id != null) {
            if (pathProject_id != localProject_id && userType != 'admin') {
                router.push(`/sidex/${localProject_id}`);
            }
        }

    }, [pathProject_id, localProject_id, userType])

    const ChangeLine = (lineSelect, line) => {

        const newLine = sidex.lines.filter((value, key) => {

            if (lineSelect == value.line_id) {
                return value;
            }

        })

        if (line == 1) {
            setLine1(newLine[0])
        }
        if (line == 2) {
            setLine2(newLine[0])
        }
        if (line == 3) {
            setLine3(newLine[0])
        }
        if (line == 4) {
            setLine4(newLine[0])
        }

    }

    if (width <= 768 && numberOfLines >= 1) {
        return (
            <div className={`mt-3`}>
                <ModalComponent
                    openModal={openModal}
                    ClickSettingFllorHandler={ClickSettingFllorHandler}
                    floor_index={floor_index}
                    line_index={line_index}
                    localProject_id = {localProject_id}
                />
                {
                    numberOfLines >= 1 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line1}
                            lineColumn={1}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
            </div>
        )
    }

    if (width > 768 && width <= 992) {
        return (
            <div className={`${style.rowLine} mt-3`}>
                <ModalComponent
                    openModal={openModal}
                    ClickSettingFllorHandler={ClickSettingFllorHandler}
                    floor_index={floor_index}
                    line_index={line_index}
                    localProject_id = {localProject_id}
                />
                {
                    numberOfLines >= 1 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line1}
                            lineColumn={1}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
                {
                    numberOfLines >= 2 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line2}
                            lineColumn={2}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
            </div>
        )
    }

    if (width > 992 && width <= 1224) {
        return (
            <div className={`${style.rowLine} mt-3`}>
                <ModalComponent
                    openModal={openModal}
                    ClickSettingFllorHandler={ClickSettingFllorHandler}
                    floor_index={floor_index}
                    line_index={line_index}
                    localProject_id = {localProject_id}
                />
                {
                    numberOfLines >= 1 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line1}
                            lineColumn={1}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
                {
                    numberOfLines >= 2 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line2}
                            lineColumn={2}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
                {
                    numberOfLines >= 3 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line3}
                            lineColumn={3}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
            </div>
        )
    }

    if (width > 1224) {
        return (
            <div className={`${style.rowLine} mt-3`}>
                <ModalComponent
                    openModal={openModal}
                    ClickSettingFllorHandler={ClickSettingFllorHandler}
                    floor_index={floor_index}
                    line_index={line_index}
                    localProject_id = {localProject_id}
                />
                {numberOfLines >= 1 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line1}
                            lineColumn={1}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
                {
                    numberOfLines >= 2 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line2}
                            lineColumn={2}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
                {
                    numberOfLines >= 3 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line3}
                            lineColumn={3}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
                {
                    numberOfLines >= 4 &&
                    <Fragment>
                        <Elevator
                            ChangeLine={ChangeLine}
                            line={line4}
                            lineColumn={4}
                            ClickSettingFllorHandler={ClickSettingFllorHandler}
                        />
                    </Fragment>
                }
            </div>
        )
    }

}

export default Sidex;