import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import {
    requestUpdateDestination,
    requestUpdateSmart
} from "../../src/redux/updateButton/updateActions";
import style from '../modal/modalComponent.module.scss';
import login from "../../pages/login";
import {Container} from "react-bootstrap";

const ModalComponent = (props) => {

    const state = useSelector(state => state.updateReducer);

    const dispatch = useDispatch();

    const {
        openModal,
        ClickSettingFllorHandler,
        floor_index,
        line_index,
        localProject_id
    } = props;


    const buttons = useSelector(state => state.sidexReducer.buttons)


    // console.log(buttons);

    const [button, setButton] = useState([])
    const [fromFloor, setFromFloor] = useState();

    useEffect(() => {

        // setButton(buttons[1].buttons_floors)

        if (floor_index != null && line_index != null) {

            setButton(buttons[line_index].buttons_floors);
            console.log(buttons[line_index].buttons_floors)

            if (localProject_id == 2) {
                const result = buttons.filter(item => item.floor_index_from == floor_index);
                setFromFloor(result)

            }else {
                const result = button.filter(item => item.floor_index == floor_index);
                setFromFloor(result)
            }

        }

    }, [floor_index, line_index, buttons])



    return (
        <div
            >
            <Modal
                show={openModal}
                centered
                onHide={ClickSettingFllorHandler}
            >
                <Modal.Header closeButton style={{ backgroundColor : 'rgba(39, 83, 47, 0.55)' }} />


                <Modal.Body
                    style={{ backgroundColor : 'rgba(39, 83, 47, 0.55)' }}
                >

                    <div className={'d-flex justify-content-around p-4'}>
                        {
                        localProject_id === '1' ? (
                        <>
                            {
                                fromFloor !== undefined ? (
                                    <>
                                        {
                                            fromFloor.map((item, index) => (
                                                <div key={index}>
                                                    {item.is_call_button == 1 ? (
                                                        <div
                                                            className={style.custom1}
                                                            style={{ backgroundColor: item.status === 1 ? 'green' : 'red' }}
                                                            onClick={() => dispatch(requestUpdateSmart(line_index, item.floor_id, item.is_call_button, item.status))}
                                                        >
                                                            From Floor
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={style.custom1}
                                                            style={{ backgroundColor: item.status === 1 ? 'green' : 'red' }}
                                                            onClick={() => dispatch(requestUpdateSmart(line_index, item.floor_id, item.is_call_button, item.status))}
                                                        >
                                                            From Elevator
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <div>
                                        Welcome Mow Choose again
                                    </div>
                                )
                            }
                        </>
                            ) : (
                                <>
                                    {
                                        fromFloor !== undefined ? (
                                            <>
                                                {
                                                    fromFloor.map((item, index) =>(
                                                            <div
                                                                key={index}
                                                            >
                                                                <span
                                                                    // onClick={requestUpdateDestination(item.floor_id_from, item.floor_id_to, item.status)}
                                                                    onClick={() => dispatch(requestUpdateDestination(item.floor_id_from, item.floor_id_to, item.status))}
                                                                    className={style.buttonFloor}
                                                                    style={{ backgroundColor: item.status === 1 ? 'green' : 'red'  }}
                                                                >
                                                                    {item.floor_name_to}
                                                                </span>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                null
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>


                </Modal.Body>

            </Modal>
        </div>
    )

}

export default ModalComponent;