import React from "react";
import style from '../Sidex/sidex.module.scss';



const Floor = ({floor,ClickSettingFllorHandler,line_index}) => {
    // console.log(line_index)

    return (
        <div className={`${style.box} d-flex`}>
            <div className={`${style.bar} col-9 mt-2 d-flex align-items-center`}>
                <div className={`${style.circleBar}`}>
                    <span className={style.circle}>
                        {floor.floor_index}
                    </span>
                </div>
                <div className={`${style.centerBar} d-flex justify-content-center`}>
                    <span className={'mt-2'}>
                        {floor.floor_name}
                    </span>
                </div>
                <div className={`${style.rightBar}`}
                onClick={()=>ClickSettingFllorHandler(true,floor.floor_index,line_index)}
                >
                    <span></span>
                </div>
            </div>
            <div className={'col-3'}>
                <div className={style.elevatorLine}>
                    <span className={style.elevLine}></span>
                    <span className={style.elevDote}></span>
                    {/* <span className={style.elevLine}></span> */}
                </div>
            </div>
        </div>
    )
}

export default Floor;