
import React from "react";

import style from '../passengerView/passengerView.module.scss';


const PassengerView = () => {
    return (
        <div>
            <div className={`${style.passengerView} d-flex justify-content-center mt-4`}>
                Passenger View
            </div>

            <div className={`${style.paddingView} mt-4`}>
                <div className={[
                    style.rowView,
                    style.rowViewActive
                ].join(' ')}>
                    <div className={style.columnView}>Status</div>
                    <div className={style.columnView}>Start</div>
                    <div className={style.columnView}>End</div>
                    <div className={style.columnView}>Time</div>
                    <div className={style.columnView}>Elevator</div>
                </div>
                <div className={style.rowView}>
                    <div className={style.columnView}>sending</div>
                    <div className={style.columnView}>G</div>
                    <div className={style.columnView}>-4</div>
                    <div className={style.columnView}>00:15</div>
                    <div className={style.columnView}>A</div>
                </div> <div className={style.rowView}>
                    <div className={style.columnView}>waiting</div>
                    <div className={style.columnView}>G</div>
                    <div className={style.columnView}>-4</div>
                    <div className={style.columnView}>00:02</div>
                    <div className={style.columnView}>A</div>
                </div> <div className={style.rowView}>
                    <div className={style.columnView}>Sending</div>
                    <div className={style.columnView}>-2</div>
                    <div className={style.columnView}>-4</div>
                    <div className={style.columnView}>00:26</div>
                    <div className={style.columnView}>A</div>
                </div>
            </div>

        </div>
    )
}

export default PassengerView;